import {
    urlSetXmlTemplate,
    postXmlTemplateGenerator
} from "../../_variables/sitemapVariables/xmlTemplateGenerators";
import postSchema from '../../models/postSchema';
import moment from 'moment';

export const monthSitemapController = async (req, res)=>{
    try {

        if (req.params?.['0']){
            const cleanParams = req.params?.['0']?.replace('.xml', '')
            const splitParams =  cleanParams.split('-')
            const month = splitParams.slice(0,2)
            const page = splitParams.length === 3 ? splitParams[splitParams.length -1]: 1
            let startDate = new Date(month + '-01');
            const endDate = moment(startDate).endOf('month');
            const postsQuery = {$and: [{'createdAt': {$gte: startDate}}, {'createdAt': {$lte: endDate}}, {status: 'published'}]}
            const posts = await postSchema.find(postsQuery).limit(500).skip(500 * (page - 1)).exec()
            res.set('Content-Type', 'text/xml');
            res.send(
                urlSetXmlTemplate(
                    postXmlTemplateGenerator(posts)
                )
            );
        }
    }catch (error){
        console.log(error)
        res.send('something webt wrong')
    }
}



