/* eslint-disable import/no-anonymous-default-export */
export default {
	id:'',
	type: 'Module',
	title: '图文模块',
    nested: false,
    src: 'module.png',
	props: { // 默认属性
        style: {},
        title: '快捷便利的点餐',
        message1: '到店不排队，点菜更容易',
        message2: '',
        type: '#fff',
        url: 'https://cdn2.weimob.com/saas/@assets/saas-fe-3g-web-stc/img/canting/4L_img.png',
        imgHeight: 300
    },
	needDiv: true,
	config: [
		{
			text: '内容编辑',
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
                {
                    type: 'string',
                    text: '图片url',
                    field: 'url' 
                },
                {
                    type: 'string',
                    text: '图片高度',
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