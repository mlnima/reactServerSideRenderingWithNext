import {Router} from 'express';
import rootSitemap from "./rootSiteMap";
import  {monthSitemapController} from "./siteMapsController";
import {categories,tags,actors} from './metaSitemapController'
import pageSitemapController from './pageSitemapController'
import searchSitemapController from './searchSitemapController'
import cacheSuccesses from "../../middlewares/apiCache";
const router = Router();

// @ts-nocheck
router.get('/', cacheSuccesses, (req, res) => rootSitemap(req, res));
router.get('/sitemaps/search.xml', cacheSuccesses, (req, res) => searchSitemapController(req, res));
router.get('/actors.xml', cacheSuccesses, (req, res) => actors(req, res));
router.get('/categories.xml', cacheSuccesses, (req, res) => categories(req, res));
router.get('/tags.xml', cacheSuccesses, (req, res) => tags(req, res));
router.get('/pages.xml', cacheSuccesses, (req, res) => pageSitemapController(req, res));
router.get('/:month', cacheSuccesses, (req, res) => monthSitemapController(req, res));
// router.get('/sitemap/:month/:pageNo', cacheSuccesses, (req, res) => subSiteMapsController.subSiteMapsController(req, res));


export default router;