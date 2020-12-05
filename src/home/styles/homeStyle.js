import diversity from '../../assets/diversity.png'

export const homeStyle = theme=>({
    container:{
        backgroundImage: "url(" +diversity+ ")",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        marginTop:-20,
        backgroundRepeat: 'no-repeat',
        height:'100vh',
        boxShadow: "inset 0px 0px 200px 200px rgba(0,0,0,0.8)",
        display:'flex',
        flexDirection:'column',
    },
    logo:{
        marginLeft:70,
        [theme.breakpoints.down('xs')]:{
            marginLeft:-5
        }
    },
    appBar:{
        backgroundColor:'transparent',
        display:'flex',
        flexDirection:'column',
        flex:1
    },
    loginButton:{
        color:"#fe2d55",
        marginRight:60,
        display:'flex',
        [theme.breakpoints.down('xs')]:{
            display:'none'
        }
    },
    humburger:{
        width: 50,
        height: 50,
    },
    center:{
        marginTop:300,
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        [theme.breakpoints.down('xs')]:{
            marginTop:200
        }
    },
    centerContainer:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    createButton:{
        marginTop:50
    },
    loginSmallDeviceBTN:{
        border:'1px solid white',
        backgroundColor:'transparent',
        paddingLeft:65,paddingRight:65,
        color:'white',
        display:'none',
        marginTop:50,
        [theme.breakpoints.down('xs')]:{
            display:'flex'
        }
    },
    label:{
        fontSize:50
    }
})

export default homeStyle