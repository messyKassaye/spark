import { fade } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

export const createAccountStyle = theme=>({

    container:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center'
    },
    appBar:{
      backgroundColor:'white',
      display:'none',
      [theme.breakpoints.down('xs')]:{
        display:'flex'
      }
    },
    link:{
      display:'none',
      [theme.breakpoints.down('xs')]:{
        display:'flex'
      }
    },
    card:{
        width:'70%',
        backgroundColor:'transparent',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        [theme.breakpoints.down('xs')]:{
          width:'90%',
          marginTop:120,

        }
    },
    text_input:{
      width:'100%',
      marginBottom:20
    },
    otherWay:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      marginTop:20
    },
    divider:{
      width:'50%'
    },
    label:{
      marginLeft:20,
      marginRight:20,
      color:grey[500]
    },
    phone:{
      marginTop:30,
      width:'100%'
    }

})

export default createAccountStyle;