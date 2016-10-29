var http = require('http')
var cheerio = require('cheerio')
var url = 'http://www.imooc.com/learn/348/'
function filterChapters(html){
	var $ =cheerio.load(html)
	var chapters = $('.chapter')
// 	[
// 		{
// 			chapterTitle:'';
// 			videos:[
// 				title:''
// 				id:''
// 			]
// 		}
// 	]
// }
	var courseData=[]
	chapters.each(function(item){
		$('div').remove('.chapter-content')
		$('button').remove()
		var chapter = $(this)
		var chapterTitle =chapter.find('strong').text()
		var videos = chapter.find('.video').children('li')
		var chapterData = {
			chapterTitle: chapterTitle,
			videos: []
		}
		videos.each(function(item){
			var video = $(this).find('.J-media-item')
			var videoTitle = video.text().replace(/\s+/g,' ')
			var id =video.attr('href').split('video/')[1]
			chapterData.videos.push({
				title : videoTitle,
				id: id
			})
		})
		courseData.push(chapterData)
	})
	return courseData;
}
function printCourseInfo(courseData){
	var info = ''
	courseData.forEach(function(item){
		info += item.chapterTitle.replace(/\s/g,' ').trim() + '\n'
		item.videos.forEach(function(video){
			info += ' 【'+video.id.replace(/\s/g,' ') +'】   '+ video.title.replace(/\s/g,' ').trim() +'\n'
		}) 
	})
	console.log(info)
}
console.log('\n						爬虫程序正在爬取...')
http.get(url,function(res) {
	var html = ''
	res.on('data',function(data){
		html += data
	})
	res.on('end',function(){
		var courseData = filterChapters(html)
		printCourseInfo(courseData)
		over();
	})
}).on('error',function(){
	console.log('获取数据出错！')
})
function over(){
	console.log('\n						爬虫程序爬取结束~~~')
}