import {metaSchema} from 'models';
import {Meta} from 'typescript-types'

import {
    sitemapItemTemplate,
    metaXmlTemplateGenerator,
    urlSetXmlTemplate
} from "../../_variables/sitemapVariables/xmlTemplateGenerators";
import {Request, Response} from "express";

export const metasSitemapsController = async (metaType:string)=>{
    let finalXML = ''
    const findMetaQuery = {$and:[{count: {$gt:0}},{status:'published'},{type:metaType}]}
    const metasCount = await metaSchema.countDocuments(findMetaQuery).exec();
    const toDay = new Date();

    if (metasCount<500){
        return sitemapItemTemplate(
            // `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/sitemapsAndStaticAsset/${metaType}-1.xml`,
            `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/sitemap-tax-${metaType}-1.xml`,
            toDay.toISOString()
        )
    }else{
        // @ts-ignore
        const lastMeta:Meta = await metaSchema.findOne(findMetaQuery)
            .select(['createdAt'])
            .limit(1)
            .sort('-_id').exec();

        const lastUpdate = lastMeta?.createdAt ?
            new Date(lastMeta.createdAt) :
            new Date(lastMeta.createdAt)

        const countOfSiteMaps = Math.ceil(metasCount/500)
        const rangeOfSitemaps = [...Array(countOfSiteMaps).keys()]

        for (const currentPage of rangeOfSitemaps){
            finalXML += sitemapItemTemplate(
                // `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/sitemapsAndStaticAsset/${metaType}-${currentPage+1}.xml`,
                `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/sitemap-tax-${metaType}-${currentPage+1}.xml`,
                lastUpdate.toISOString()
            )
        }

        return finalXML
    }
}


export const metaSitemapController= async (req:Request,metaType:string,metaUrlFormat:string)=>{
    try {
        const findMetaQuery = {$and:[{count: {$gt:0}},{status:'published'},{type:metaType}]}
        const cleanParams = req.params['0'].replace('.xml', '')
        const splitParams =  cleanParams.split('-')
        const page =  splitParams[splitParams.length -1] || 1
        const metas = await metaSchema.find(findMetaQuery).limit(500).skip(500 * (page - 1)).exec()
        return urlSetXmlTemplate(metaXmlTemplateGenerator(metas,metaType,'1','hourly',metaUrlFormat))
    }catch (error){
        console.log(error)
    }
}


export const categories = async (req:Request, res:Response) => {
    try {
        res.set('Content-Type', 'text/xml');
        res.send(await metaSitemapController(req,'categories','category'))
    } catch (err) {
        console.error(err)
        res.status(500).json({message:'Something went wrong please try again later'})
    }
}


export const tags = async (req:Request, res:Response) => {
    try {
        res.set('Content-Type', 'text/xml');
        res.send(await metaSitemapController(req,'tags','tag'))
    } catch (err) {
        console.error(err)
        res.status(500).json({message:'Something went wrong please try again later'})
    }
}

export const actors = async (req:Request, res:Response) => {
    try {
        res.set('Content-Type', 'text/xml');
        res.send(await metaSitemapController(req,'actors','actor'))
    } catch (err) {
        console.error(err)
        res.status(500).json({message:'Something went wrong please try again later'})
    }
}


