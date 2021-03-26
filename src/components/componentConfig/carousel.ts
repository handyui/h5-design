/* eslint-disable import/no-anonymous-default-export */
export default {
	id:'',
	type: 'Carousel',
	title: '轮播图',
    nested: false,
    src: 'carousel.png',
	props: { // 默认属性
        style: {},
        title: '更全面的后台能力',
        message1: '从小票机到物流到其他的对接',
        message2: '给您更全面的后台接单和处理能力',
        type: '#f1f1f5',
        url1: 'https://cdn2.weimob.com/saas/@assets/saas-fe-3g-web-stc/img/canting/6L_img1.png',
        des1: '小发票',
        url2: 'https://cdn2.weimob.com/saas/@assets/saas-fe-3g-web-stc/img/canting/6L_img2.png',
        des2: '物流',
        imgHeight: 300
    },
	needDiv: true,
	config: [
		{
			text: '文字内容',
			children:[
                {
                    type: 'string',
                    text: '标题内容',
                    field: 'title' // props.content
                },
                {
                    type: 'string',
                    text: '描述内容',
                    field: 'message1' // props.content
                },
                {
                    type: 'string',
                    text: '描述内容',
                    field: 'message2' // props.content
                },
            ]
        },
        {
			text: '轮播图',
			children:[
                {
                    type: 'string',
                    text: '图片1url',
                    field: 'url1' 
                },
                {
                    type: 'string',
                    text: '图片1描述',
                    field: 'des1' 
                },
                {
                    type: 'string',
                    text: '图片2url',
                    field: 'url2'
                },
                {
                    type: 'string',
                    text: '图片2描述',
                    field: 'des2' 
                },
                {
                    type: 'string',
                    text: '轮播图高度',
                    field: 'imgHeight' 
                },
            ]
        },
        {
            text: '主题',
            children: [{
                type: 'array',
                text: '背景颜色',
                field: 'type',
                data: [
                    {
                        text: '白色',
                        value: '#fff',
                    },
                    {
                        text: '灰色',
                        value: '#f1f1f5',
                    },
                ]
            }]
        },
    ]
}