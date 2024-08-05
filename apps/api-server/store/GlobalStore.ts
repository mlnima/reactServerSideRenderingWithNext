import settingSchema from '@schemas/settingSchema';
import mongoose from 'mongoose';
import path from 'path';
import { Worker } from 'worker_threads';
import { Widget } from '@repo/typescript-types';
import widgetSchema from '@schemas/widgetSchema';
import WidgetController from "../controllers/WidgetController";

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', true);

class GlobalStore {
    initialSettings: any;
    settings: {
        [key: string]: {}[];
    };
    widgets: {
        [key: string]: Widget[];
    };

    constructor() {
        this.initialSettings = {};
        this.widgets = {};
        this.settings = {};
    }

    async connectToDatabase(connectorName?: string) {
        try {
            const dbUser = process.env.DB_USER ? `${process.env.DB_USER}:` : '';
            const dbPass = process.env.DB_PASS ? `${process.env.DB_PASS}@` : '';
            const dbHost = process.env.DB_HOST ? process.env.DB_HOST : 'localhost';
            const dbConnectQuery = `mongodb://${dbUser}${dbPass}${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

            console.log(`mongoDBConnectionQueryGenerator()=> `, dbConnectQuery);
            await mongoose.connect(dbConnectQuery);
            console.log(`${connectorName || ''}* connected to Database *`);
        } catch (error) {
            console.log('Error connecting to Database', error);
            process.exit(1);
        }
    }

    async setServerStartupData() {
        this.setSettings();
        this.setWidgets();
    }

    async setWidgets() {
        const allWidgets = await widgetSchema
            .find({
                'data.position': { $nin: ['deactivated', 'trash'] },
            })
            .populate([
                {
                    model: 'meta',
                    path: 'data.uniqueData.metaData',
                }
            ])
            .lean()
            .exec();

        for await (const widget of allWidgets) {
            if (
                widget?.data?.type === 'posts' ||
                widget?.data?.type === 'postsList' ||
                widget?.data?.type === 'postsSlider' ||
                widget?.data?.type === 'postsSwiper'
            ) {
                //@ts-ignore
                const { posts, totalCount } = await WidgetController.findWidgetPosts(widget.data);

                widget.data.uniqueData = {
                    ...widget.data.uniqueData,
                    posts,
                    totalCount
                }
            }
        }

        this.widgets = allWidgets.reduce((widgetInPositions: any, widget: Widget) => {
            if (!widgetInPositions[widget?.data?.position]) {
                widgetInPositions[widget.data.position] = [];
            }
            widgetInPositions[widget.data.position].push(widget);
            return widgetInPositions;
        }, {});

        for (const position in this.widgets) {
            this.widgets[position].sort((a, b) => a.data.widgetIndex - b.data.widgetIndex);
        }
    }

    async setSettings() {
        const allSettings = await settingSchema.find({}).lean().exec();
        this.settings = allSettings.reduce((final, current) => {
            final[current.type] = current.data;
            return final;
        }, {});
    }

    async setSetting(settingType: string, data) {
        console.log(`${settingType} has been changed`)
        this.settings[settingType] = data;
    }

    getSettings(requestedSettings: string[]) {
        const SettingsToSend = requestedSettings.reduce((final, current) => {
            final[current] = this.settings?.[current] || {};
            return final;
        }, {});

        return SettingsToSend;
    }

    getSetting(requestedSetting: string) : {[key:string]:any} {
        return this.settings?.[requestedSetting];
    }

    getWidgets(positions: string[], locale?: string) {
        const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE;
        return positions.reduce((result, position) => {
            if (!this.widgets?.[position]) {
                result[position] = [];
                return result;
            }

            result[position] = this.widgets[position].map(widget => {
                if (!!locale && locale !== defaultLocale) {
                    if (
                        widget?.data?.type === 'posts' ||
                        widget?.data?.type === 'postsList' ||
                        widget?.data?.type === 'postsSlider' ||
                        widget?.data?.type === 'postsSwiper'
                    ) {
                        return {
                            ...widget,
                            data: {
                                ...widget.data,
                                translations: {
                                    [locale]: widget.data.translations?.[locale],
                                },
                                uniqueData: {
                                    ...widget.data.uniqueData,
                                    posts: (widget.data?.uniqueData?.posts).map(post => {
                                        return {
                                            ...post,
                                            translations: {
                                                [locale]: post?.translations?.[locale] || {},
                                            },
                                        };
                                    }),
                                },
                            },
                        };
                    }

                    if (widget?.data?.type === 'meta' || widget?.data?.type === 'metaWithImage') {
                        return {
                            ...widget,
                            data: {
                                ...widget.data,
                                translations: {
                                    [locale]: widget.data.translations?.[locale],
                                },
                                uniqueData: {
                                    ...widget.data.uniqueData,
                                    metaData: (widget.data?.uniqueData?.metaData).map(meta => {
                                        return {
                                            ...meta,
                                            translations: {
                                                [locale]: meta?.translations?.[locale] || {},
                                            },
                                        };
                                    }),
                                },
                            },
                        };
                    }

                    return {
                        ...widget,
                        data: {
                            ...widget.data,
                            translations: {
                                [locale]: widget.data.translations?.[locale],
                            },
                        },
                    };
                } else {
                    const { translations, ...dataWithoutTranslations } = widget.data;
                    return {
                        ...widget,
                        data: dataWithoutTranslations,
                    };
                }
            });

            return result;
        }, {});
    }

    getContentPerPage() {
        const initialSettings =  this.getSetting('initialSettings')
        return initialSettings?.contentSettings?.contentPerPage || 20;
    }

    getLocales({withDefault=true}) {
        if (!withDefault){
            return process.env.NEXT_PUBLIC_LOCALES.replace(process.env.NEXT_PUBLIC_DEFAULT_LOCALE, '').split(' ');
        }
        return process.env.NEXT_PUBLIC_LOCALES.split(' ');
    }

    async execCommand(command: string) {
        try {
            const workerPath = path.join(__dirname, '../workers/commandExecutor/worker.js');

            const worker = new Worker(workerPath, { workerData: { command } });

            worker.once('message', result => {
                worker.postMessage({ exit: true });
                return result.response;
            });

            worker.on('error', error => {
                console.log('error:', error);
            });

            worker.on('exit', exitCode => {
                console.log('exitCode : ', exitCode);
            });
        } catch (err) {
            console.log(err);
        }
    }
}

export default new GlobalStore();
