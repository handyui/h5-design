/* eslint-disable import/no-anonymous-default-export */
export default {
	id:'',
	type: 'Tag',
	title: "标签",
	nested: false,
	src: "tag.png",
	props: {
		content: 'tag',
		style: {}
	},
	needDiv: true,
	config: [
		{
			text: '文字内容',
			children:[{
				type: 'string',
				text: '内容',
				field: 'content' // props.content
			}]
		}
	],
}