import {ReactNode} from "react";

export interface PageTypes {
    _id?: string,
    pageName: string,
    sidebar: string,
    status: string,
    imageUrl: string,
    pageStyle: string,
    title:string,
    description:string,
    keywords:string,
}

export type PageParams = Promise<{
    identifier?: string,

    lang?:string,
    postType?:string,
    actorId?:string,
    tagId?:string,
    categoryId?:string,
    pageName?:string,
    keyword?:string,
    username?:string,
    _id?:string,
}>

export type PageSearchParams = Promise<{
    [key: string]: string | string[] | undefined
}>

export interface ILayoutProps{
    params: PageParams,
    children: ReactNode
}

export interface IPageProps {
    params: PageParams,
    searchParams?: PageSearchParams,
}