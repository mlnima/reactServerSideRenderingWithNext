<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
    <xsl:template match="/">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <title>XML Sitemap</title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
                <meta name="robots" content="noindex,follow"/>
                <style type="text/css">
                    body {
                        font-family: "Lucida Grande", "Lucida Sans Unicode", Tahoma, Verdana;
                        font-size: 13px;
                    }

                    #intro {
                        background-color: black;
                        color: white;
                        border: 1px #2580B2 solid;

                        margin: 10px;
                        border-radius: 25px;
                        padding: 15px;
                        text-align: center;
                    }

                    #intro p {
                        line-height: 16.8667px;

                    }

                    #intro strong {
                        font-weight: normal;
                    }

                    tbody {
                        width: 100%;
                    }

                    td {
                        width: 200px;
                        font-size: 11px;
                    }
                    td:first-of-type {
                        width: 500px;
                        font-size: 11px;
                    }
                    td:last-of-type {
                        width: 200px !important;
                        font-size: 11px;
                    }

                    th {
                        text-align: left;
                        padding-right: 30px;
                        font-size: 11px;
                    }

                    tr.high {
                        background-color: whitesmoke;
                    }

                    #footer {
                        padding: 2px;
                        margin-top: 10px;
                        font-size: 8pt;
                        color: gray;
                    }

                    #footer a {
                        color: gray;
                    }

                    a {
                        color: black;
                    }
                </style>
            </head>
            <body>
                <xsl:apply-templates></xsl:apply-templates>
                <div id="footer">
                    <p>Google ExpressJs (XML) Sitemaps Generated by NM for ReactJs CMS Project This XSLT
                        template is released under the GPL and free to use but it doesn't mean you can copy our code
                        without Licence
                    </p>

                </div>
            </body>
        </html>
    </xsl:template>


    <xsl:template match="sitemap:urlset">
        <h1>XML Sitemap</h1>
        <div id="intro">
            <p>
                This is a XML Sitemap which is supposed to be processed by search engines which follow the XML Sitemap
                standard like Ask.com, Bing, Google and Yahoo.
                <br/>
                It was generated only for the React content management system and the by NM
                <br/>
            </p>
        </div>
        <div id="content">
            <table cellpadding="5">
                <tr style="border-bottom:1px black solid;">
                    <th>URL</th>
                    <th>Priority</th>
                    <th>Change frequency</th>
                    <th>Last modified (GMT)</th>
                </tr>
                <xsl:variable name="lower" select="'abcdefghijklmnopqrstuvwxyz'"/>
                <xsl:variable name="upper" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'"/>
                <xsl:for-each select="./sitemap:url">
                    <tr>
                        <xsl:if test="position() mod 2 != 1">
                            <xsl:attribute name="class">high</xsl:attribute>
                        </xsl:if>
                        <td>
                            <xsl:variable name="itemURL">
                                <xsl:value-of select="sitemap:loc"/>
                            </xsl:variable>
                            <a href="{$itemURL}">
                                <xsl:value-of select="sitemap:loc"/>
                            </a>
                        </td>
                        <td>
                            <xsl:value-of select="concat(sitemap:priority*100,'%')"/>
                        </td>
                        <td>
                            <xsl:value-of
                                    select="concat(translate(substring(sitemap:changefreq, 1, 1),concat($lower, $upper),concat($upper, $lower)),substring(sitemap:changefreq, 2))"/>
                        </td>
                        <td>
                            <xsl:value-of
                                    select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)))"/>
                        </td>
                    </tr>
                </xsl:for-each>
            </table>
        </div>
    </xsl:template>


    <xsl:template match="sitemap:sitemapindex">
        <h1>XML Sitemap Index</h1>
        <div id="intro">
            <p>
                This is a XML Sitemap which is supposed to be processed by search engines which follow the XML Sitemap
                standard like Ask.com, Bing, Google and Yahoo.
                <br/>
                It was generated only for the React content management system and the by NM
                <br/>

            </p>
            <h2>* This file contains links to sub-sitemaps, follow them to see the actual sitemap content. *</h2>
        </div>
        <div id="content">
            <table cellpadding="5">
                <tr style="border-bottom:1px black solid;">
                    <th>URL of sub-sitemap</th>
                    <th>Last modified (GMT)</th>
                </tr>
                <xsl:for-each select="./sitemap:sitemap">
                    <tr>
                        <xsl:if test="position() mod 2 != 1">
                            <xsl:attribute name="class">high</xsl:attribute>
                        </xsl:if>
                        <td>
                            <xsl:variable name="itemURL">
                                <xsl:value-of select="sitemap:loc"/>
                            </xsl:variable>
                            <a href="{$itemURL}">
                                <xsl:value-of select="sitemap:loc"/>
                            </a>
                        </td>
                        <td>
                            <xsl:value-of
                                    select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)))"/>
                        </td>
                    </tr>
                </xsl:for-each>
            </table>
        </div>
    </xsl:template>
</xsl:stylesheet>