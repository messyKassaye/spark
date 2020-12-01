const  accountSettingStyle = theme=>({
    container:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:500,
        margin:25,
        height:'100%',
        backgroundColor:'transparent',
        [theme.breakpoints.down('xs')]:{
            width:200
        }
    }
})

export default accountSettingStyle
