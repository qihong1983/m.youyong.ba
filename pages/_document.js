import React from 'react';
import Document, {
    Head,
    Main,
    NextScript
} from 'next/document';
import {
    flush
} from 'next-style-loader/applyStyles';

export default class MyDocument extends Document {

    render() {
        const {
            nextStyle
        } = this.props;



        return (
            <html>
                <Head>
                    { nextStyle.tag }
                      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
                    <link rel="manifest" href="/static/manifest.json" />
    <link href="https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css" rel="stylesheet" />
    
                    <link rel="stylesheet" href="/static/demo.css" />

                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}

MyDocument.getInitialProps = function(ctx) {

    // console.log(ctx);
    const props = Document.getInitialProps(ctx);

    props.nextStyle = flush();

    return props;
};