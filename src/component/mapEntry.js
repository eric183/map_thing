import React, { useRef, useEffect, useState, Fragment } from 'react';
// import { mm } from '../asset/data/points1.json';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { saveAs } from 'file-saver';
import './ani.css';

import Logo from "../asset/images/logo.png";
let map, mouseTool;

let markerHandler = {};

const MapEntry = props => {
    
   
    let grid = 8, myRef = useRef(null);
  

    const [items, setItems] = useState([]);
    const [hasLoading, setLoad] = useState(false);
    
    function injectIndexNumber(obj, number) {

        obj.visibility = "visible";
        obj.id = (number || items.length).toString();
        return obj;
    }


    function drawBinder(type) {
        let editor;
        for(let i in markerHandler) {
            if(!!markerHandler[i]) {
                markerHandler[i].setMap();
            }
        }

      
        switch(type) {
            case "circle":
                mouseTool.circle({
                    strokeColor: "#FF33FF",
                    strokeOpacity: 1,
                    strokeWeight: 6,
                    strokeOpacity: 0.2,
                    fillColor: '#1791fc',
                    fillOpacity: 0.4,
                    strokeStyle: 'solid',
                    // 线样式还支持 'dashed'
                    // strokeDasharray: [30,10],
                });

                editor = AMap.CircleEditor;
            break;
            case "rectangle":
                
                mouseTool.rectangle({
                    strokeColor:'red',
                    strokeOpacity:0.5,
                    strokeWeight: 6,
                    fillColor:'blue',
                    fillOpacity:0.5,
                    // strokeStyle还支持 solid
                    strokeStyle: 'solid',
                    // strokeDasharray: [30,10],
                });
                editor = AMap.RectangleEditor;

            break;

            default: 
                return 0;


        }

        mouseTool.on('draw', drawer);

        function drawer(event) {
            // event.obj 为绘制出来的覆盖物对象
            // log.info('覆盖物对象绘制完成')

            // debugger;

            // console.log(event.obj);
            mouseTool.close();
            
            markerHandler[event.obj['CLASS_NAME'].toLocaleLowerCase().replace(/.+\./, '')] = event.obj;

            // markerHandler[event.obj['CLASS_NAME'].toLocaleLowerCase().replace(/.+\./, '')] = event.obj;
            // markerHandler.editor = new editor(map, event.obj);
            // console.log(event.obj['CLASS_NAME'].toLocaleLowerCase().replace(/.+\./, ''))
            
            markersCollider(event.obj);
            

            mouseTool.off('draw', drawer);
        }
        
    }

    // function drawCircle() {
    //     for(let i in markerHandler) {
    //         if(!!markerHandler[i]) {
    //             markerHandler[i].setMap();
    //         }
    //     }


    //     mouseTool.circle({
    //         strokeColor: "#FF33FF",
    //         strokeOpacity: 1,
    //         strokeWeight: 6,
    //         strokeOpacity: 0.2,
    //         fillColor: '#1791fc',
    //         fillOpacity: 0.4,
    //         strokeStyle: 'solid',
    //         // 线样式还支持 'dashed'
    //         // strokeDasharray: [30,10],
    //     });



    //     mouseTool.on('draw', drawer);

    //     function drawer(event) {
    //         // event.obj 为绘制出来的覆盖物对象
    //         // log.info('覆盖物对象绘制完成')

    //         // debugger;

    //         // console.log(event.obj);
    //         mouseTool.close();
            
    //         markerHandler.circle = event.obj;

    //         markersCollider(event.obj);
            

    //         mouseTool.off('draw', drawer);
    //     }
        
    //     // markersCollider(circle);

    //     // if(markerHandler.circle) {
            
    //     //     markerHandler.circle.type.setMap();
    //     // }

    //     // var circle = new AMap.Circle({
    //     //     center: map.getCenter(),
    //     //     radius: 1000, //半径
    //     //     borderWeight: 3,
    //     //     strokeColor: "#FF33FF", 
    //     //     strokeOpacity: 1,
    //     //     strokeWeight: 6,
    //     //     strokeOpacity: 0.2,
    //     //     fillOpacity: 0.4,
    //     //     strokeStyle: 'dashed',
    //     //     strokeDasharray: [10, 10], 
    //     //     // 线样式还支持 'dashed'
    //     //     fillColor: '#1791fc',
    //     //     zIndex: 50,
    //     // })
    
    //     // circle.setMap(map)
    //     // 缩放地图到合适的视野级别
    //     // map.setFitView([ circle ]);

    //     // markersCollider(circle);
    //     // markerHandler.circle = {
    //     //     type: circle,
    //     //     editor: new AMap.CircleEditor(map, circle)
    //     // }
    // }

    // function drawRect() {


    //     for(let i in markerHandler) {
    //         if(!!markerHandler[i]) {
    //             markerHandler[i].setMap();
    //         }
    //     }

    //     mouseTool.rectangle({
    //         strokeColor:'red',
    //         strokeOpacity:0.5,
    //         strokeWeight: 6,
    //         fillColor:'blue',
    //         fillOpacity:0.5,
    //         // strokeStyle还支持 solid
    //         strokeStyle: 'solid',
    //         // strokeDasharray: [30,10],
    //     })


        
    //     mouseTool.on('draw', drawer);

    //     function drawer(event) {
    //         // event.obj 为绘制出来的覆盖物对象
    //         // log.info('覆盖物对象绘制完成')

    //         // debugger;

    //         // console.log(event.obj);
    //         mouseTool.close();
    //         markerHandler[event.obj['CLASS_NAME'].toLocaleLowerCase().replace(/.+\./, '')] = event.obj;
    //         console.log(event.obj['CLASS_NAME'].toLocaleLowerCase().replace(/.+\./, ''))
            
    //         // debugger;
    //         markersCollider(event.obj);
            

    //         mouseTool.off('draw', drawer);
    //     }
    //     // markersCollider(rectangle);

    //     // if(markerHandler.circle) markerHandler.circle.type.setMap();
    //     // let center = map.getCenter();
    //     // let m = center.offset(1000, 1000);
       
    //     // var bounds = new AMap.Bounds(center, m);
    //     // var rectangle = new AMap.Rectangle({
    //     //     bounds: bounds,
    //     //     strokeColor:'red',
    //     //     strokeWeight: 6,
    //     //     strokeOpacity:0.5,
    //     //     strokeDasharray: [30,10],
    //     //     // strokeStyle还支持 solid
    //     //     strokeStyle: 'dashed',
    //     //     fillColor:'blue',
    //     //     fillOpacity:0.5,
    //     //     cursor:'pointer',
    //     //     zIndex:50,
    //     // })

    //     // rectangle.setMap(map);
        
    //     // map.setFitView([ rectangle ]);

    //     // markersCollider(rectangle);

    //     // markerHandler.rectangle = {
    //     //     type: rectangle,
    //     //     editor: new AMap.RectangleEditor(map, rectangle)
    //     // }
    // }

    function markersCollider(geometry, closeAni) {
        let handlerEditor;
        let markers = map.getAllOverlays("marker");
        

        markers.forEach(m=> { m.setAnimation("AMAP_ANIMATION_NONE") })

        let findMarkers = markers.filter((obj, index) =>  geometry.contains(obj.getPosition()));
        findMarkers.forEach(m=> { m.setAnimation("AMAP_ANIMATION_BOUNCE") })


        // geometry.on('click', leftClick);

    

        geometry.on('rightclick', rightClick);
        
        console.log(`已选${findMarkers.length}个marker`);


        // Editor Coliider EventListener
        const handlerCloserTool = evt => {
            handlerEditor && handlerEditor.close();
            window.removeEventListener('keyup', handlerCloserTool, false);


            // recall self after editor finished and stop all animation of chosen markers
            // geometry.off('click', leftClick),
            geometry.off('rightclick', rightClick),
            markersCollider(geometry, true);
            
        };
        
        window.addEventListener('keyup', handlerCloserTool, false);


        // function leftClick(evt) {
        //     handlerEditor = markerHandler[evt.target['CLASS_NAME'].toLocaleLowerCase().replace(/.+\./, '')].editor
            
        //     handlerEditor.open();
        // }

        function rightClick(evt) {
            var fileName = prompt("请输入导出文件名", "export");
            // debugger;
            if (fileName != null) {
                // document.getElementById("demo").innerHTML =
                // "Hello " + person + "! How are you today?";
                // AMap.GeoJSON()
                let obj = {
                    type: "FeatureCollection",
                    features: findMarkers.map((d)=> d.getExtData()),
                };
                
                var blob = new Blob([JSON.stringify(obj)], { type: "application/json" });
                
                saveAs(blob, `${fileName}.geojson`);


                
            } else {
                return;
            }
        }

    }

    function resortMarkerLayer(_items) {

        var markers = [];

    
        map && map.clearMap && map.clearMap();  

        
        let myItems = _items.map((tap, index) => {

            let geoFiles = new AMap.GeoJSON({
                geoJSON: tap,
                // map: map,
    
                // getPolyline: () => {
                //     console.log('as');
                // },
                getMarker: (geojson, lnglats) => {
                    // debugger;
                    // var area = AMap.GeometryUtil.ringArea(lnglats[0]);

                    // let visibleValue = true;
                    // console.log(geojson.properties.name);
                    let marker = new AMap.Marker({
                        // position: lnglats,
                        // content: '<div style="background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
                        // offset: new AMap.Pixel(-15, -15)
                        
                        // map: map,
                        position: lnglats,
                        visible: tap.visibility == 'visible' ? true : false,
                        title: geojson.properties.name,
                        // label: "南方",
                        // content: "你好",
                        animation: "AMAP_ANIMATION_DROP",
                        clickable: true,
                        extData: geojson,
                        // fillOpacity: 1 - Math.sqrt(area / 8000000000),// 面积越大透明度越高
                        // strokeColor: 'white',
                        // fillColor: 'red',
                        // zIndex: tap3.features.indexOf(geojson),
                        zIndex: index,
                    });
                    
                    marker.setMap(map);
                    markers.push(marker);
                   
                    

                    return markers;
                },
            });
         
            // let m = geoFiles.toGeoJSON();
            // debugger;
            return geoFiles;
        });


        // console.log(findMarkers.length);
    }

    
    const getItems = count =>
        Array.from({ length: count }, (v, k) => k).map(k => ({
            id: `item-${k}`,
            content: `item ${k}`
        }
    ));

    const reorder = (list, startIndex, endIndex) => {
      
        let _list = [...list];
        const result = Array.from(_list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const getItemStyle = (isDragging, draggableStyle) => ({
        position: 'relative',
        userSelect: 'none',
        padding: '15px',
        background: 'rgba(0, 0, 0, 0.5)',
        color: '#fff',
        fontSize: '12px',
        width: '96%',
        boxSizing: "border-box",
        margin: '2px auto',
        background: isDragging ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.5)",
        ...draggableStyle
    });

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.2)",
        width: '150px',
        height: '350px',
        overflow: 'auto',
    });

    const onDragEnd = (result,v,j) => {

        if (!result.destination) {
            return;
        } else if(result.source.index === result.destination.index) {
            return;
        }
        
        let myitems = reorder(
            items,
            result.source.index,
            result.destination.index
        )
        setItems(myitems);

    }

    const uploader = (event) => {
        let reader = new FileReader();
        reader.readAsText(event.target.files[0]);
        reader.onload = (event) => {
            setItems([...items, injectIndexNumber(JSON.parse(event.target.result), items.length + 1)]);
        }
    } 

    const hideAndShow = (item, index) => {
        // debugger    
        // item.visibility = item.visibility == "hidden" ? "visible" : "hidden";
        
        let _items = [...items];

        _items[index].visibility = item.visibility == "hidden" ? "visible" : "hidden";
        // _items[index].visibility = "none"
        // debugger
        // _items[0].visibility = "none";
        setItems(_items);
    }
   

    useEffect(() => {
        resortMarkerLayer(items);

        // var southWest = new AMap.LngLat(113.934298, 22.506958)
        // var northEast = new AMap.LngLat(114.016801, 22.740162)
    
        // var bounds = new AMap.Bounds(southWest, northEast)
    
        // var rectangle = new AMap.Rectangle({
        //     bounds: bounds,
        //     strokeColor:'red',
        //     strokeWeight: 6,
        //     strokeOpacity:0.5,
        //     strokeDasharray: [30,10],
        //     // strokeStyle还支持 solid
        //     strokeStyle: 'dashed',
        //     fillColor:'blue',
        //     fillOpacity:0.5,
        //     cursor:'pointer',
        //     zIndex: 50,
        // })
    
        // rectangle.setMap(map)
        // let overLayGroup = new AMap.OverlayGroup([rectangle])
        // map.add(overLayGroup);

        // let number = overLayGroup.getOverlays();
        // debugger;
        
        
        // var circle = new AMap.Circle({
        //     center: new AMap.LngLat(114.039756, 22.521769),  // 圆心位置
        //     radius: 1000, // 圆半径
        //     fillColor: 'red',   // 圆形填充颜色
        //     strokeColor: '#fff', // 描边颜色
        //     strokeWeight: 2, // 描边宽度
        // });
        
        // map.add(circle);
    }, [items])

    useEffect(() => {
        map = new AMap.Map(myRef.current, {
            center: [113.934298, 22.506958],
            zoom: 15
        });

        map.on('complete', () => {
            setLoad(true);
        })
        // debugger;
        map.plugin(["AMap.ToolBar"], function () {
            map.addControl(new AMap.ToolBar());
        });

        mouseTool = new AMap.MouseTool(map)
    }, [])


    return (
        <div className="map-entry" ref={myRef} style={{ width: '100%', height: '100%' }}>
            <div className="loading-content" 
                style={{ 
                    position: "fixed", 
                    left: 0, 
                    right: 0, 
                    top: 0, 
                    bottom: 0,
                    background: '#234873',
                    zIndex: hasLoading ? 0 : 200,
                    display: hasLoading ? "none" : "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                <img src={Logo} className="waitAnimate" style={{ width: '200px', height: '200px' }}/>
            </div>
            
            <div className="mapToggle" style={{ position: "fixed", left: '50px', top: '30%', zIndex: 1 }}>
                {/* haha */}
                <DragDropContext onDragEnd={onDragEnd}>
                    
                    <Droppable droppableId="droppable">
                        
                        {(provided, snapshot) => (
                            <Fragment>
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                >
                                    <p style={{     
                                        textAlign: 'left',
                                        background: '#2A92BF',
                                        /* height: '100px', */
                                        padding: '10px',
                                        margin: '0',
                                        color: '#fff',
                                        fontSize: '12px',
                                        paddingLeft: '25px',
                                    }}>Layer Manager</p>

                                    { items.map((item, index) => (
                                        <Draggable 
                                            key={item.id} 
                                            index={index}
                                            draggableId={item.id} 
                                            onClick={hideAndShow}
                                            >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}
                                                >
                                                    图层{item.id}
                                                    
                                                    <button 
                                                        onClick={ ()=> hideAndShow(item, index) }
                                                        style={{
                                                            position: "absolute", 
                                                            right: 3,
                                                            position: 'absolute',
                                                            right: '3px',
                                                            height: '100%',
                                                            top: 0,
                                                            width: '50px',
                                                            background: 'transparent',
                                                            color: '#fff',
                                                            border: "none", 
                                                        }}
                                                    >
                                                        {item['visibility'] != 'hidden' ? "隐藏" : "显示"}
                                                    </button>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}

                                    <button style={{ 
                                        position: 'relative',
                                        userSelect: 'none',
                                        padding: '15px',
                                        background: 'rgba(247, 3, 49, 0.5)',
                                        color: 'rgb(255, 255, 255)',
                                        fontSize: '12px',
                                        width: '96%',
                                        boxSizing: 'border-box',
                                        display: 'block',
                                        margin: 'auto',
                                        border: 0,
                                     }}>
                                        <input 
                                            onChange={uploader}
                                            type="file" 
                                            style={{
                                                position: "absolute",
                                                opacity: 0,
                                                // visibility: 'hidden', 
                                                width: '100%',
                                                height: '100%',
                                                left: 0,
                                                top: 0,
                                                zIndex: 5
                                            }}
                                        />
                                        Add Layer
                                    </button>

                                </div>

                                <div 
                                    style={{
                                        position: "fixed",
                                        display: 'flex',
                                        flexFlow: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'space-around',
                                        right: "50px",
                                        top: "30%",
                                        padding: '8px',
                                        width: '150px',
                                        height: '350px',
                                        overflow: 'auto',
                                        background: 'rgba(0, 0, 0, 0.2)',
                                        zIndex: 1,
                                        cursor: 'auto',
                                        visibility: items.length > 0 ? "visible": "hidden",
                                        opacity: items.length > 0 ? "1": "0",
                                        transition: 'all .3s'
                                    }}
                                    className="geometry-content">
                                    <div 
                                        style={{ 
                                            width: "70px", 
                                            height: '70px',
                                            background: '#fff',
                                            border: '1px solid #fff',
                                            borderRadius: '50%',
                                        }}
                                        className="geomery circle"
                                        onClick={ () => drawBinder("circle")}>

                                    </div>
                                    <div 
                                        style={{ 
                                            width: "70px", 
                                            height: '70px',
                                            background: '#fff',
                                            border: '1px solid #fff', 
                                        }}
                                        className="geomery rect"
                                        onClick={() => drawBinder("rectangle")}>
                                        
                                    </div>
                                </div>
                            </Fragment>
                        )}
                    </Droppable>
                </DragDropContext>

            </div>
        </div>
    )
}

export default MapEntry;

