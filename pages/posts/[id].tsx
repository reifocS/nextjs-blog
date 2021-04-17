import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'
import React from 'react'
import ReactMarkdownWithHtml from 'react-markdown'
import CodeBlock from "../../components/codeblock"

export default function Post({
    postData
}: {
    postData: {
        title: string
        date: string
        contentHtml: string
        markdown: string
    }
}) {
    return (
        <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
            <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <div className={utilStyles.lightText}>
                <Date dateString={postData.date} />
            </div>
                <ReactMarkdownWithHtml source={postData.markdown} allowDangerousHtml renderers={{ code: CodeBlock }} />
        </article>
    </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const postData = await getPostData(params.id as string)
    return {
        props: {
            postData
        }
    }
}