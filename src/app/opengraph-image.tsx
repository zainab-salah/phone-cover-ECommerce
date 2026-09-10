import { ImageResponse } from 'next/og'
export const alt = 'BSMA Case — Art to carry, worlds to keep'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <div style={{ width:'100%',height:'100%',display:'flex',background:'#081835',color:'#f4eddf',padding:64,position:'relative' }}>
      <div style={{ position:'absolute',inset:24,border:'1px solid #695737',display:'flex' }} />
      <div style={{ display:'flex',flexDirection:'column',justifyContent:'space-between',width:770 }}>
        <div style={{ display:'flex',fontSize:27,letterSpacing:5,color:'#d5ab5d' }}>BSMA CASE</div>
        <div style={{ display:'flex',flexDirection:'column',fontFamily:'serif',fontSize:88,lineHeight:1.05 }}><span>For the art</span><span style={{color:'#d5ab5d',fontStyle:'italic'}}>you carry.</span></div>
        <div style={{display:'flex',fontSize:21,color:'#aeb6c6'}}>Original artwork. Custom phone cases. A little moonlight.</div>
      </div>
      <div style={{ display:'flex',position:'absolute',right:70,top:135,width:260,height:320,alignItems:'center',justifyContent:'center',border:'1px solid #695737',borderRadius:'50%' }}>
        <svg width='210' height='210' viewBox='0 0 100 100'><path d='M65 12a36 36 0 1 0 18 65A38 38 0 0 1 65 12Z' fill='#d5ab5d'/><path d='m79 17 2.5 8.5L90 28l-8.5 2.5L79 39l-2.5-8.5L68 28l8.5-2.5Z' fill='#d5ab5d'/></svg>
      </div>
    </div>, size)
}
