import { useState, useEffect, Fragment } from "react"; 
import { Link, useOutletContext } from "react-router-dom";
import styles from "./css/home.module.css"


function Home() {
    const [carouselIndex, setCarouselIndex] = useState({first: 0, second: 0});
    const {products} = useOutletContext();
    
    const mensWatch = products?.filter?.((product) => product.category === "mens-watches");
    const womansWatch = products?.filter?.((product) => product.category === "womens-watches");
    
    useEffect(() => {
        const key = setInterval(() => {
            setCarouselIndex(prevIndex => {
            if(prevIndex?.first === -1) return {...prevIndex, first: mensWatch.length - 1};
            if(prevIndex?.first === mensWatch?.length - 1) return {...prevIndex, first: 0};
            
            return {...prevIndex, first: prevIndex.first + 1};
          })
        }, 2000);
    
        return () => clearInterval(key);
      }, [mensWatch])

      useEffect(() => {
        const key = setInterval(() => {
            setCarouselIndex(prevIndex => {
            if(prevIndex.second === -1) return {...prevIndex, second: womansWatch.length - 1};
            if(prevIndex.second === womansWatch?.length - 1) return {...prevIndex, second: 0};
            
            return {...prevIndex, second: prevIndex.second + 1};
          })
        }, 2000);
    
        return () => clearInterval(key);
      }, [womansWatch])
    
    const leftArrow = () => (pos) => (array) => {    
        setCarouselIndex((prevIndex) => {
            if(prevIndex[pos] === 0) {
                
                return {...prevIndex, [pos]: array?.length - 1};
            }

            return {...prevIndex, [pos]: prevIndex[pos] - 1};
        });
    };

    const rightArrow = () => (pos) => (array) => {
        setCarouselIndex((prevIndex) => {
            if(prevIndex[pos] === array?.length - 1) {
             
                return {...prevIndex, [pos]: 0};
            }
            return {...prevIndex, [pos]: prevIndex[pos] + 1};
        });
    };

    const handleLeftArrowClick = leftArrow();

    const handleRightArrowClick = rightArrow();

    const handleCircleClick = (e) => (pos) => {
        const currentIndex = Number(e.target.dataset.index);
        
        return setCarouselIndex((prevIndex) => {
            return {...prevIndex, [pos]: currentIndex};
        });
    };
    
    
return (
    <main>
        <section className="carousel">
            <div>
                <h2>{`${mensWatch?.[0].category}`}</h2>
                <button onClick={() => handleLeftArrowClick("first")(mensWatch)}>prev</button>
                    
                {mensWatch?.map?.((item, index) => {
                    return (
                        <Fragment key={item.id}>
                                    
                            <img
                                src={item.images[0]}
                                alt={item.title}
                                className={`${carouselIndex.first === index ? styles.active : styles.deActive}`}
                            />
                                    
                        </Fragment>
                    );
                })}
                    
                <div>
                    {mensWatch?.map?.((item, index) => {
                        return (
                            <Fragment key={item.id}>
                                <button
                                    data-index={`${index}`}
                                    onClick={(e) => handleCircleClick(e)("first")}
                                >
                                    {index}
                                </button>
                            </Fragment>
                        )
                    })}
                </div>
                <button onClick={() => handleRightArrowClick("first")(mensWatch)}>next</button>
            </div>

            <div>
                <h2>{`${womansWatch?.[0].category}`}</h2>
                <button onClick={() => handleLeftArrowClick("second")(womansWatch)}>prev</button>
                    
                {womansWatch?.map?.((item, index) => {
                    return (
                        <Fragment key={item.id}> 
                            <img
                                src={item.images[0]}
                                alt={item.title}
                                className={`${carouselIndex.first === index ? styles.active : styles.deActive}`}
                            />     
                        </Fragment>
                    );
                })}
                    
                <div>
                    {womansWatch?.map?.((item, index) => {
                        return (
                            <Fragment key={item.id}>
                                <button
                                    data-index={`${index}`}
                                    onClick={(e) => handleCircleClick(e)("second")}
                                >
                                    {index}
                                </button>
                            </Fragment>
                        )
                    })}
                </div>
                <button onClick={() => handleRightArrowClick("second")(womansWatch)}>next</button>
            </div>   
        </section>

    </main>
);
}



export default Home;