module.exports = {

  video: {

    listVideo: 'App.Video.ListQuery',

    detail: 'App.Video.Detail',

    collect: 'App.VideoCollection.AddUserCollection',

    uncollect: 'App.VideoCollection.CancelUserCollection',

    favorite: 'App.VideoFavorite.AddUserFavorVideo',

    cancelFavorite: 'App.VideoFavorite.CancelUserFavorVideo',

    userCollectVideoList: 'App.Video.GetUserCollectVideos',

    userFavoriteVideoList: 'App.Video.GetUserFavoriteVideos',

    searchHistoryList: 'App.SearchHistory.GetMemberSearchHistory',

    clearSearchHistory: 'App.SearchHistory.RemoveAll'

  },
  
  member: {

    wxlogin: 'App.Member.WechatMiniLogin',

    editMember: 'App.Member.EditMember'

  }

}