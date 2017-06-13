var list = [
	// {
	// 	title:"eat",
	// 	isChecked:false,
	// 	id:new Date().getTime()
	// }
];

var vue = new Vue({
	el:'#container',
	data:{
		list:list,
		todo:''
	},
	methods:{
		add:function (ev) {
			this.list.push({
				title:this.todo,
				isChecked:false,
				id:new Date().getTime()
			});
			this.todo = null;
		},
		del:function (todo) {
			var index = this.list.indexOf(todo);
			this.list.splice(index, 1);
		}
	}
});