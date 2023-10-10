import xHScrapper from "./xHScrapper";

const postDataScrappers = async (req, res) => {
    try {
        const urlToScrap = req.body.urlToScrap

        if (urlToScrap.includes('xhamster')) {

            await xHScrapper(urlToScrap).then(urlData => {
                res.json({urlData})
            })

            // res.end()

        } else {
            res.end()
        }
    } catch (error) {
        console.log(error)
    }

}

export default postDataScrappers;