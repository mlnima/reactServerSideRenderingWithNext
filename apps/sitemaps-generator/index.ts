import dotenv from 'dotenv';
dotenv.config({path: '../../.env'});
import {connectToDatabase} from 'custom-server-util';
connectToDatabase('Sitemap')

import {searchKeywordsSitemapsGenerator} from './src/searchSitemap'
import {rootSitemapGenerator} from './src/rootSiteMap'
import {metaSitemapGenerator} from './src/metaSitemap'
import {pagesSitemapGenerator} from './src/pageSitemap'
import {robotsTxtGenerator} from './src/robotsTxtGenerator'


const baseOutputPath = '../web-application/public'

const runAllGenerators = async ()=>{
   await rootSitemapGenerator(baseOutputPath)
   await searchKeywordsSitemapsGenerator(baseOutputPath)
   await metaSitemapGenerator(baseOutputPath)
   await pagesSitemapGenerator(baseOutputPath)
   await robotsTxtGenerator(baseOutputPath)
}

runAllGenerators().finally(()=>process.exit())

export default {}