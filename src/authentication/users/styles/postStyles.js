export const postStyles = theme=>({
    container:{
        display:'flex',flexDirection:'row',justifyContent:'center',
        [theme.breakpoints.down('xs')]:{
            marginTop:-25
        }
    }
})

export default postStyles