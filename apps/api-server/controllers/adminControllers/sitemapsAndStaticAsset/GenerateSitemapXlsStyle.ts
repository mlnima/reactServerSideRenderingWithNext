import fs from "fs";
import path from 'path';
export const GenerateSitemapXlsStyle = async (baseOutputPath:string) => {
    path.join(__dirname, `/sitemap.xls`)
    try {
        fs.copyFile( path.join(__dirname, `./sitemap.xsl`),`${baseOutputPath}/sitemap.xsl`,error=>{
            console.log(`error GenerateSitemapXlsStyle=> `,error)
        })
    } catch (error) {
        console.log(error)
    }
};
