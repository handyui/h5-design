/* eslint-disable import/no-anonymous-default-export */
export default {
	id:'',
	type: 'Banner',
	title: "banner",
    nested: false,
    src: "banner.png",
	props: { // 默认属性
        style: {},
        title: "商盟智慧餐厅",
        message1: "餐饮O2O解决方案，助力餐饮商户搭建去中心",
        message2: "化平台，多渠道引客到店，多样化促活增收",
        type: "w_ban1"
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
            text: '主题',
            children: [{
                type: 'array',
                text: '背景颜色',
                field: 'type',
                data: [
                    {
                        text: '图片1',
                        value: 'w_ban1',
                    },
                    {
                        text: '图片2',
                        value: 'w_ban2',
                    },
                    {
                        text: '图片3',
                        value: 'w_ban3', 
                    },
                    {
                        text: '图片4',
                        value: 'w_ban4', 
                    },
                    {
                        text: '图片5',
                        value: 'w_ban5', 
                    },
                    {
                        text: '图片6',
                        value: 'w_ban6', 
                    }
                ]
            }]
        },
    ]
}