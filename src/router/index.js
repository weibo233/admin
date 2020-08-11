import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    /**
     * default            默认展开导航索引
     * isNav              是否为展示导航
     * icon               导航图标
     * title              一级菜单名字
     * meta:{
     *   documentTitle    网页标题
     *   childTitle       子级路由名字
     *   default          默认展开导航索引
     * }
   */
    // 关于我们
    {
      path: '/enterpriseInformation',
      name: 'enterpriseInformation',
      meta: {
        default: "1",
        title: '企业信息',
        isNav: true,
        icon: 'iconfont el-icon-s-help'
      },
      components: {
        default: () => import("../components/layout/index")
      },
      children: [
        {
          path: '/enterpriseInformation',
          name: 'enterpriseInformation',
          meta: {
            documentTitle:"企业信息",
            childTitle: '企业信息',
            default: '1-1',
            parentDefault: '1',
          },
          components: {
            default: () => import("../view/enterpriseInformation")
          },
        },
        {
          path:'/register',
          name: 'register',
          meta:{
            documentTitle:"修改密码",
            childTitle: '修改密码',
            default: '1-2',
            parentDefault: '1',
          },
          components:{
            default: ()=>import("../view/register")
          }
        },
        // {
        //   path:'/banner',
        //   name:"banner",
        //   meta:{
        //     documentTitle:"轮播图维护",
        //     childTitle:"轮播图维护",
        //     default:"1-3",
        //     parentDefault:"1",
        //   },
        //   components:{
        //     default:() =>import("../view/banner")
        //   }
        // }
      ]
    },

    // 文章
    {
      path: '/article',
      name: 'article',
      meta: {
        default: "2",
        title: '文章信息',
        isNav: true,
        icon: 'iconfont el-icon-s-help'
      },
      components: {
        default: () => import("../components/layout/index")
      },
      children: [
        {
          path: '/tenderAnnouncement',
          name: 'tenderAnnouncement',
          meta: {
            documentTitle:"招标公告",
            childTitle: '招标公告',
            default: '2-1',
            parentDefault: '1',
          },
          components: {
            default: () => import("../view/tenderAnnouncement")
          },
        },
        {
          path: '/honor',
          name: 'honor',
          meta: {
            documentTitle:"荣誉证书",
            childTitle: '荣誉证书',
            default: '2-2',
            parentDefault: '2',
          },
          components: {
            default: () => import("../view/honor")
          },
        },
        {
          path:'/qualifications',
          name:'qualifications',
          meta:{
            documentTitle:"资质证书",
            childTitle: '资质证书',
            default: '2-3',
            parentDefault: '2',
          },
          components: {
            default: () => import("../view/qualifications")
          },
        },
        {
          path: '/law',
          name: 'law',
          meta: {
            documentTitle:"行政法规",
            childTitle: '行政法规',
            default: '2-4',
            parentDefault: '2',
          },
          components: {
            default: () => import("../view/law")
          },
        },
        {
          path: '/Construction',
          name: 'Construction',
          meta: {
            documentTitle:"建设法律",
            childTitle: '建设法律',
            default: '2-5',
            parentDefault: '2',
          },
          components: {
            default: () => import("../view/Construction")
          },
        },
        {
          path: '/documents',
          name: 'documents',
          meta: {
            documentTitle:"国务院文件",
            childTitle: '国务院文件',
            default: '2-6',
            parentDefault: '2',
          },
          components: {
            default: () => import("../view/documents")
          },
        },
        {
          path: '/rules',
          name: 'rules',
          meta: {
            documentTitle:"部门规章",
            childTitle: '部门规章',
            default: '2-7',
            parentDefault: '2',
          },
          components: {
            default: () => import("../view/rules")
          },
        },
        {
          path: '/local',
          name: 'local',
          meta: {
            documentTitle:"地方法规",
            childTitle: '地方法规',
            default: '2-8',
            parentDefault: '2',
          },
          components: {
            default: () => import("../view/local")
          },
        },
        {
          path: '/dataDownload',
          name: 'dataDownload',
          meta: {
            documentTitle:"资料下载",
            childTitle: '资料下载',
            default: '2-9',
            parentDefault: '2',
          },
          components: {
            default: () => import("../view/dataDownload")
          },
        },
        {
          path: '/project',
          name: 'project',
          meta: {
            documentTitle:"工程案例",
            childTitle: '工程案例',
            default: '2-10',
            parentDefault: '2',
          },
          components: {
            default: () => import("../view/project")
          },
        },
        {
          path: '/CorporateNews',
          name: 'CorporateNews',
          meta: {
            documentTitle:"企业新闻",
            childTitle: '企业新闻',
            default: '2-12',
            parentDefault: '2',
          },
          components: {
            default: () => import("../view/CorporateNews")
          },
        },
        {
          path: '/industryNews',
          name: 'industryNews',
          meta: {
            documentTitle:"行业新闻",
            childTitle: '行业新闻',
            default: '2-13',
            parentDefault: '2',
          },
          components: {
            default: () => import("../view/industryNews")
          },
        },
        {
          path: '/TalentRecruitment',
          name: 'TalentRecruitment',
          meta: {
            documentTitle:"人才招聘",
            childTitle: '人才招聘',
            default: '2-14',
            parentDefault: '2',
          },
          components: {
            default: () => import("../view/TalentRecruitment")
          },
        },
        {
          path: '/charging',
          name: 'charging',
          meta: {
            documentTitle:"收费标准",
            childTitle: '收费标准',
            default: '2-15',
            parentDefault: '2',
          },
          components: {
            default: () => import("../view/charging")
          },
        },
      ]
    },
    // // 招标信息
    // {
    //   path: '/tenderInformation',
    //   name: 'tenderInformation',
    //   meta: {
    //     default: "2",
    //     title: '招标信息',
    //     isNav: true,
    //     icon: 'iconfont el-icon-s-help'
    //   },
    //   components: {
    //     default: () => import("../components/layout/index")
    //   },
    //   children: [
    //     {
    //       path: '/tenderAnnouncement',
    //       name: 'tenderAnnouncement',
    //       meta: {
    //         documentTitle:"招标公告",
    //         childTitle: '招标公告',
    //         default: '2-1',
    //         parentDefault: '2',
            
    //       },
    //       components: {
    //         default: () => import("../view/tenderAnnouncement")
    //       },
    //     },
    //     {
    //       path: '/dataDownload',
    //       name: 'dataDownload',
    //       meta: {
    //         documentTitle:"资料下载",
    //         childTitle: '资料下载',
    //         default: '2-2',
    //         parentDefault: '2',
    //       },
    //       components: {
    //         default: () => import("../view/dataDownload")
    //       },
    //     },
    //   ]
    // },

    // // 企业荣誉
    // {
    //   path: '/certificate',
    //   name: 'certificate',
    //   meta: {
    //     default: "3",
    //     title: '企业荣誉',
    //     isNav: true,
    //     icon: 'iconfont el-icon-s-help'
    //   },
    //   components: {
    //     default: () => import("../components/layout/index")
    //   },
    //   children: [
    //     {
    //       path: '/honor',
    //       name: 'honor',
    //       meta: {
    //         documentTitle:"荣誉证书",
    //         childTitle: '荣誉证书',
    //         default: '3-1',
    //         parentDefault: '3',
    //       },
    //       components: {
    //         default: () => import("../view/honor")
    //       },
    //     },
    //     {
    //       path: '/qualifications',
    //       name: 'qualifications',
    //       meta: {
    //         documentTitle:"资质证书",
    //         childTitle: '资质证书',
    //         default: '3-2',
    //         parentDefault: '3',
    //       },
    //       components: {
    //         default: () => import("../view/qualifications")
    //       },
    //     },
    //     {
    //       path: '/case',
    //       name: 'case',
    //       meta: {
    //         documentTitle:'案例展示',
    //         childTitle: '案例展示',
    //         default: '3-3',
    //         parentDefault: '3',
    //       },
    //       components: {
    //         default: () => import("../view/case")
    //       },
    //     },
    //   ]
    // },

    // // 政策文件
    // {
    //   path: '/policy',
    //   name: 'policy',
    //   meta: {
    //     default: "4",
    //     title: '政策文件',
    //     isNav: true,
    //     icon: 'iconfont el-icon-s-help'
    //   },
    //   components: {
    //     default: () => import("../components/layout/index")
    //   },
    //   children: [
    //     {
    //       path: '/law',
    //       name: 'law',
    //       meta: {
    //         documentTitle:"行政法规",
    //         childTitle: '行政法规',
    //         default: '4-1',
    //         parentDefault: '4',
    //       },
    //       components: {
    //         default: () => import("../view/law")
    //       },
    //     },
    //     {
    //       path: '/Construction ',
    //       name: 'Construction ',
    //       meta: {
    //         documentTitle:'建设法律',
    //         childTitle: '建设法律',
    //         default: '4-2',
    //         parentDefault: '4',
    //       },
    //       components: {
    //         default: () => import("../view/Construction")
    //       },
    //     },
    //     {
    //       path: '/documents',
    //       name: 'documents',
    //       meta: {
    //         documentTitle:'国务院文件',
    //         childTitle: '国务院文件',
    //         default: '4-3',
    //         parentDefault: '4',
    //       },
    //       components: {
    //         default: () => import("../view/documents")
    //       },
    //     },
    //     {
    //       path: '/rules',
    //       name: 'rules',
    //       meta: {
    //         documentTitle:'部门规章',
    //         childTitle: '部门规章',
    //         default: '4-4',
    //         parentDefault: '4',
    //       },
    //       components: {
    //         default: () => import("../view/rules")
    //       },
    //     },
    //     {
    //       path: '/local',
    //       name: 'local',
    //       meta: {
    //         documentTitle:'地方法规',
    //         childTitle: '地方法规',
    //         default: '4-5',
    //         parentDefault: '4',
    //       },
    //       components: {
    //         default: () => import("../view/local")
    //       },
    //     },
    //   ]
    // },

   
    {
      path:'/login',
      name: 'login',
      meta:{
        documentTitle:'登陆',
        isNav:false
      },
      components:{
        default: ()=>import("../view/login")
      }
    },
    // welcome
    {
      path: '/',
      redirect: '/welcome',
      meta:{
        isNav:false
      }
    },
    {
      path: '/welcome',
      name: 'welcome',
      meta: {
        default: "0",
        isNav:false
      },
      components: {
        default: () => import("../components/layout/index")
      },
      redirect:"/welcome/home",
      children: [
        {
          path: '/welcome/home',
          name: 'welcomeHome',
          meta: {
            default: "0",
            documentTitle:'welcomeHome'
          },
          components: {
            default: () => import("../view/welcome")
          },
        }
      ]
    },
    {
      path:'/404',
      components:{
        default: ()=> import ("../view/404")
      },
      meta:{
        isNav: false,
        title:'404'
      }
    },
    {
      path: '/*',
      redirect: '/404',
      meta:{
        isNav:false,
      }
    },
  ]
})
