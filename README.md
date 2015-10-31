filmList
---

filmList 是一个记录看过的电影以及想看的电影的小应用. 同时可以记录两个人对此电影的评分.
该应用后台基于 Nodejs 编写, 前后台使用 RESTful API 进行分离.

## API

	读取权限:
	
	- 获取已看电影列表		GET http://domain.com/api/watchedlist
	- 获取想要看的电影列表	GET http://domain.com/api/wantlist


	写入权限:
	
	- 直接添加已看电影		POST http://domain.com/api/watchedlist
	- 直接添加想要看的电影		POST http://domain.com/api/wantlist
	- 将指定的想要看的电影标记为已看电影		PUT http://domain.com/api/wantlist
	
	
POST 的发送和接收数据, 以及接收到的数据, 都使用 json 进行, 示例如下:

```javascript
	{
		"id": 23,			// 在添加记录的时候, 该字段无需填写, 由后台处理. 在标记电影的时候, 需要填写.
		"name": "窃听风暴",
		"time": 1446283572077,
		"starA": 5,
		"starB": 4,
		"url": "http://movie.douban.com/subject/1900841/",	// 点击跳转链接
		"image": "http://img4.douban.com/view/photo/photo/public/p1808851998.jpg"		// 电影海报图片
	}
```
