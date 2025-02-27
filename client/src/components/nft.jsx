import { useQuery } from '@apollo/client';
import { GET_NFT } from '../graphql/queries';
import { useContext, useEffect, useState } from 'react';
import cross from '../assets/cross.svg'
import buy from '../assets/buy.svg'
import { Context } from '../context/context';
import { buyNFT } from '../apis/contracts';
import '../styles/nft.css'

const NFTs = ({close})=>{

    const context = useContext(Context);
    const {nftList , setNftList , accData} = context;
    const [toggle , setToggle] = useState('all');// 'all' | 'my' | 'list'

    const { loading, error, data } = useQuery(GET_NFT,{
        variables: { first: 10,skip:0},
      });
    const [loadingFeed , setLoadingFeed] = useState('');
    const [errorFeed , setErrorFeed] =useState('');

    useEffect(()=>{
        if(loading) setLoadingFeed('Loading...');
        else setLoadingFeed('');
      },[loading]);

      useEffect(()=>{
        if(error) setErrorFeed('Some Error Occured');
        else setErrorFeed('');
      },[error]);

      useEffect(()=>{
        if(data && data.videoMinteds){
            let tempData = (data.videoMinteds).map(obj => {
                let metadata = JSON.parse(obj.metadata);
                let tempObj = {...obj , metadata};
                return tempObj
              });
              setNftList(tempData);
        }
      },[data,error])

    async function buyNft(nft) {
        const tokenId = nft.tokenId;
        const transaction = await buyNFT({tokenId:tokenId,accData});
        if(!transaction){
            alert('Purchase not Successful');
            return;
        }
        alert('Purchase Successful')
    }

    return(
        <div className = "dialog-wrapper">
            <div className="glassmorphism dialog-box" style={{height:'70vh',width:'40vw'}}>
                <img src={cross} alt="" onClick={()=>{close(false)}}
                style={{position:'fixed', top:'10px' , right:'10px'}}/>
                {loadingFeed && <div className="sys-msg">{loadingFeed}</div>}
                {errorFeed && <div className="sys-msg">{errorFeed}</div>}
                <div className='toggle-btn-wrapper'>
                <div className='toggle-btn' onClick={()=>setToggle("all")}
                style={toggle==='all'?{background:'#fff',color:'black'}:{background:'transparent',color:'#fff'}}>All NFT's</div>
                <div className='toggle-btn' onClick={()=>setToggle("my")}
                style={toggle==='my'?{background:'#fff',color:'black'}:{background:'transparent',color:'#fff'}}>My NFT's</div>
                </div>
                { toggle === 'all' &&
                    nftList.map((nft)=>{
                        return(
                            <>
                            <div className='nft-list-box'>
                               <p style={{fontSize:'1.2rem'}}>{nft.metadata.title}</p> 
                               <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                               <img src={buy} alt='' onClick={async ()=>{
                                const response = prompt('You want to purchase? Enter Y to continue')
                                if(response !== 'Y') return;
                                buyNft(nft) 
                               }}/>
                               {nft?.price}eth
                               </div>
                            </div>
                            </>
                        )
                    })
                }
                {
                    toggle === 'my' && 
                    nftList.map((nft)=>{
                        
                        return(
                            <>
                            <div className='nft-list-box'>
                               <p style={{fontSize:'1.2rem'}}>{nft.metadata.title}</p> 
                            </div>
                            </>
                        )
                    })
                }

                {
                    toggle === 'list' && 
                    nftList.map((nft)=>{
                        return (
                            <>
                            <div className='nft-list-box'>
                               <p style={{fontSize:'1.2rem'}}>{nft.metadata.title}</p> 
                            </div>
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default NFTs