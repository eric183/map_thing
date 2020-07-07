import React, { useRef, useEffect, useState, Fragment } from 'react';
// import { mm } from '../asset/data/points1.json';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


let map;
const MapEntry = props => {
    
   
    let grid = 8, myRef = useRef(null);
  

    const [items, setItems] = useState([]);
    
    function drawCircle() {
        var circle = new AMap.Circle({
            center: map.getCenter(),
            radius: 1000, //半径
            borderWeight: 3,
            strokeColor: "#FF33FF", 
            strokeOpacity: 1,
            strokeWeight: 6,
            strokeOpacity: 0.2,
            fillOpacity: 0.4,
            strokeStyle: 'dashed',
            strokeDasharray: [10, 10], 
            // 线样式还支持 'dashed'
            fillColor: '#1791fc',
            zIndex: 50,
        })
    
        circle.setMap(map)
        // 缩放地图到合适的视野级别
        map.setFitView([ circle ]);

        markersCollider(circle);

    }

    function drawRect() {
        let center = map.getCenter();
        let m = center.offset(1500, 1500);
        // console.log(m);

        // debugger;
        // console.log();
        // debugger;
        // var southWest = new AMap.LngLat(center);
        // var northEast = new AMap.LngLat(center);
        // console.log(new AMap.LngLat(center).offset(10, 10));
        // debugger;
        var bounds = new AMap.Bounds(center, m);
        var rectangle = new AMap.Rectangle({
            bounds: bounds,
            strokeColor:'red',
            strokeWeight: 6,
            strokeOpacity:0.5,
            strokeDasharray: [30,10],
            // strokeStyle还支持 solid
            strokeStyle: 'dashed',
            fillColor:'blue',
            fillOpacity:0.5,
            cursor:'pointer',
            zIndex:50,
        })
                
        rectangle.setMap(map);
        map.setFitView([ rectangle ]);

        markersCollider(rectangle);
    }

    function markersCollider(gemometry, bool) {
        let markers = map.getAllOverlays("marker");
        // debugger;
        let findMarkers = markers.filter((obj, index) =>  gemometry.contains(obj.getPosition()));
        // debugger;
        alert(findMarkers.length);
    }


    function injectIndexNumber(obj, number) {

        obj.visibility = "visible";
        obj.id = (number || items.length).toString();
        return obj;
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
                    
                    // var area = AMap.GeometryUtil.ringArea(lnglats[0]);

                    // let visibleValue = true;
                    // console.log(geojson);
                    let marker = new AMap.Marker({
                        // position: lnglats,
                        // content: '<div style="background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
                        // offset: new AMap.Pixel(-15, -15)
                        
                        // map: map,
                        position: lnglats,
                        visible: tap.visibility == 'visible' ? true : false,
                        // title: "你好",
                        // label: "南方",
                        // content: "你好",
                        animation: "AMAP_ANIMATION_DROP",
                        clickable: true,
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

    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        // console.log(list, startIndex, endIndex);
        // console.log(list);
        let _list = [...list];
        const result = Array.from(_list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        // console.log('resort', result);
        return result;
    };

    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        position: 'relative',
        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,

        // change background colour if dragging
        background: isDragging ? "lightgreen" : "grey",

        // styles we need to apply on draggables
        ...draggableStyle
    });

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? "lightblue" : "lightgrey",
        padding: grid,
        width: 150,
        height: 350,
        overflow: 'auto'
    });

    const onDragEnd = (result,v,j) => {
        // dropped outside the list
        // console.log(map);
        if (!result.destination) {
            return;
        } else if(result.source.index === result.destination.index) {
            return;
        }
        // debugger;
        
        let myitems = reorder(
            items,
            result.source.index,
            result.destination.index
        )
        setItems(myitems);
        // console.log(items);
        // resortMarkerLayer(myitems);
       
    }

    const uploader = (event) => {
        // debugger;

        let reader = new FileReader();
        reader.readAsText(event.target.files[0]);
        reader.onload = (event) => {
            // debugger;
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
        // debugger;
        map.plugin(["AMap.ToolBar"], function () {
            map.addControl(new AMap.ToolBar());
        });
    }, [])


    return (
        <div className="map-entry" ref={myRef} style={{ width: '100%', height: '100%' }}>
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
                                    <p style={{ textAlign: 'center' }}>图层管理</p>
                                    {items.map((item, index) => (
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

                                    <button style={{ position: 'relative', width: '100%', height: '50px' }}>
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
                                        添加图层
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
                                        background: 'lightgrey',
                                        zIndex: 1,
                                        cursor: 'auto',
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
                                        onClick={drawCircle}>

                                    </div>
                                    <div 
                                        style={{ 
                                            width: "70px", 
                                            height: '70px',
                                            background: '#fff',
                                            border: '1px solid #fff', 
                                        }}
                                        className="geomery rect"
                                        onClick={drawRect}>
                                        
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

