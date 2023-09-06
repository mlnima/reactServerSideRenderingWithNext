'use client';
import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch} from "@store/hooks";
import {useSelector} from "react-redux";
import './FormWidget.styles.scss'
import FormWidgetField from "@components/widgets/widgets/FormWidget/FormWidgetField/FormWidgetField";
import {loading, setAlert} from "@store/reducers/globalStateReducer";
import {postFormData} from "fetch-requests";

interface FormWidgetPropTypes {
    locale: string,
    dictionary: {
        [key: string]: string
    },
    widgetId: string,
    uniqueData: {
        formName: string,
        formTitle: string,
        afterSubmitMessage: string,
        submitButtonText: string,
        formFields: {
            required: boolean,
            fieldType: string,
            fieldIndex: number,
            fieldPlaceHolder: string,
            fieldName: string
        }[]
    }
}

const FormWidget: FC<FormWidgetPropTypes> = ({widgetId, uniqueData, locale, dictionary}) => {

    const dispatch = useAppDispatch()
    const {userId} = useSelector(({user}) => user)
    const {username} = useSelector(({user}) => user)
    const {role} = useSelector(({user}) => user)

    const [state, setState] = useState(() => {
        return {
            language: locale,
            widgetId: widgetId,
            formName: uniqueData.formName,
            data: {}
        }
    })

    useEffect(() => {
        setState(prevState => ({
            ...prevState,
            data: {
                ...prevState.data,
                userId,
                username,
                role
            }
        }))
    }, [userId, username, role]);

    const [isSubmit, setIsSubmit] = useState(false)

    const onFormFieldsChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setState({
            ...state,
            data: {
                ...state.data,
                [e.target.name]: e.target.value
            }
        })
    }

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loading(true));
        try {
            const formData = {
                ...state,
                date: Date.now()
            };
            await postFormData({formDataToPost: formData});
            setIsSubmit(true);
        } catch (error) {
            dispatch(setAlert({
                message: "Something went wrong, please try again later.",
                type: "error"
            }));
        } finally {
            dispatch(loading(false));
        }
    };


    return (
        <div className='formWidget'>
            {isSubmit ? <h3 className='afterSubmitMessage'>
                    {
                        dictionary?.[
                        uniqueData?.afterSubmitMessage ||
                        'Your Form Has Been Submitted'
                            ] ||
                        'Your Form Has Been Submitted'
                    }
                </h3> :
                <form onSubmit={e => onSubmitHandler(e)} className='formWidgetDynamicForm'>
                    <h2>{dictionary?.[uniqueData?.formTitle] || uniqueData?.formTitle}</h2>
                    {
                        [...(uniqueData?.formFields || [])]
                            ?.sort((a, b) => (a?.fieldIndex > b?.fieldIndex) ? 1 : -1)
                            ?.map((field, index) => {
                                return (
                                    <FormWidgetField key={index}
                                                     onFormFieldsChangeHandler={onFormFieldsChangeHandler}
                                                     field={field}
                                                     dictionary={dictionary}/>
                                )
                            })}
                    <button type='submit' className='btn btn-primary submitButton'>
                        {uniqueData?.submitButtonText || 'Submit'}
                    </button>
                </form>
            }
        </div>
    )

};
export default FormWidget;


// const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     try {
//         dispatch(loading(true))
//         await postFormData({
//             //modified after moving to nextjs 13 app router ,might need to modify due to createdAt at db
//             formDataToPost: {
//                 ...state,
//                 date: Date.now()
//             }
//         }).then(() => {
//             setIsSubmit(true)
//         }).catch(() => {
//             dispatch(setAlert({
//                 message: "Something went wrong please try again later",
//                 type: "error"
//             }))
//         })
//
//     } catch (error) {
//         dispatch(setAlert({
//             message: "Something went wrong please try again later",
//             type: "error"
//         }))
//     } finally {
//         dispatch(loading(false))
//     }
// }