var tasks = localStorage.getItem('tasks');
tasks = tasks ? JSON.parse(tasks) : []; 
var editTaskIndex = null;

$(function(){
	render();
	$('.close').click(closeTaskEdit);
	$('.add').click(addTask);
	$('.save').click(saveTask);
	$('body').on('click','.delete',deleteTask);
})

function addTask(){
	$('.task-edit').show();
	$('.task-content').val('');
}

function saveTask(){
	var name = $('.task-name').val();
	var appid = $('.task-appid').val();
	var dev = $('.task-dev').val();
	var date = $('.task-date').val();
	var index = tasks.length;
	var task = {
		index: index,
		name: name,
		appid: appid,
		dev: dev,
		date: date
	}
	if(editTaskIndex != null){
		tasks[editTaskIndex].name = name;
		tasks[editTaskIndex].appid = appid;
		tasks[editTaskIndex].dev = dev;
		tasks[editTaskIndex].date = date;
	}else{
		tasks.push(task);
	}
	editTaskIndex = null;
	save();
	$('.task-edit').hide();
	render();
}

function deleteTask(){
	var i = $(this).closest('.task-ele').attr('index');
	tasks.splice(i, 1);
	save();
	render();
}

function editTask(){
	editTaskIndex = $(this).closest('.task-ele').attr('index');
	$('.task-edit').show();
	var task = tasks[editTaskIndex];
	$('.task-name').val(task.name);
	$('.task-appid').val(task.appid);
	$('.task-dev').val(task.dev);
	$('.task-date').val(task.date);
}

function closeTaskEdit(){
	$('.task-edit').hide();
}

function render(){
	var list = $('.task-list').empty();
	tasks.forEach(function(task, i){
		var ele = $('<div class="task-ele"></div>').attr('index',i).appendTo(list);
		var index = $('<p class="index"></p>').text(task.index).appendTo(ele);
		var name = $('<p class="name"></p>').text( task.name).appendTo(ele);
		var appid = $('<p class="appid"></p>').text( task.appid).appendTo(ele);
		var dev = $('<p class="dev"></p>').text(task.dev).appendTo(ele);
		var date = $('<p class="date"></p>').text(task.date).appendTo(ele);
		var opt = $('<div class="opt"></div>').appendTo(ele);
		$('<i class="edit">edit</i>').appendTo(opt);
		$('<i class="delete">delete</i>').appendTo(opt);
	})
	$('.task-list .edit').click(editTask);
}

function save(){
	localStorage.setItem('tasks', JSON.stringify(tasks));
}