const matchesCardStyle = theme=>({
    names:{
        position:'absolute',
        boxShadow:" inset 0px 0px 0px 60px rgba(0,0,0,0.1)",
        bottom:20,
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-end',
        [theme.breakpoints.down('xs')]:{
            position:'relative',
            top:85
        }
    }
})

export default matchesCardStyle