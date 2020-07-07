import React, { useRef, useEffect, useState } from 'react';
// import { mm } from '../asset/data/points1.json';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const MapEntry = props => {
    
    // var map = new AMap.Map('container', {
    //     center: [107.943579, 30.131735],
    //     zoom: 7
    // }); 
    let map, grid = 8, myRef = useRef(null);

    var tap1 = require('../asset/data/points1.json');
    // let tap2 = require('../asset/data/points2.json');
    let tap3 = require('../asset/data/points3.json');

    var [items, setItems] = useState([injectIndexNumber(tap1, 1), injectIndexNumber(tap3, 2)]);
    
    function injectIndexNumber(obj, number) {
        obj.id = (number || items.length).toString();
        return obj;
    }

    function resortMarkerLayer(_items) {

        let myItems = _items.map((tap, index) => {
            return new AMap.GeoJSON({
                geoJSON: tap,
    
                // 还可以自定义getMarker和getPolyline
    
                // getPolyline: () => {
                //     console.log('as');
                // },
                getMarker: (geojson, lnglats) => {
                    var area = AMap.GeometryUtil.ringArea(lnglats[0])
                    // console.log(geojson);
                    return new AMap.Marker({
                        position: lnglats,
                        title: "你好",
                        animation: "AMAP_ANIMATION_DROP",
                        clickable: true,
                        // fillOpacity: 1 - Math.sqrt(area / 8000000000),// 面积越大透明度越高
                        // strokeColor: 'white',
                        // fillColor: 'red',
                        // zIndex: tap3.features.indexOf(geojson),
                        zIndex: index,
                    });
                },
            });
    
        })        
        myItems.forEach((item) => { item.setMap(map) });

    }

    useEffect(() => {
        map = new AMap.Map(myRef.current, {
            center: [113.934298, 22.506958],
            zoom: 15
        });
        // debugger;
        map.plugin(["AMap.ToolBar"], function () {
            map.addControl(new AMap.ToolBar());
        });

        // console.log(require('../asset/data/points1.json'));

        resortMarkerLayer(items);
    }, [])

    // fake data generator
    const getItems = count =>
        Array.from({ length: count }, (v, k) => k).map(k => ({
            id: `item-${k}`,
            content: `item ${k}`
        }));

    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        // console.log(list);
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        // console.log('resort', result);
        return result;
    };

    

    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer

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

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
          return;
        }
        items = reorder(
            items,
            result.source.index,
            result.destination.index
        )
        
        setItems(items);

        resortMarkerLayer(items);
        // console.log(items);
        // this.setState({
        //   items
        // });
    }
    
    // var items = getItems(10);
    // var items = [tap1, tap3];

    //   console.log(tap1);
    return (
        <div className="map-entry" ref={myRef} style={{ width: '100%', height: '100%' }}>
            <div className="mapToggle" style={{ position: "fixed", left: '50px', top: '30%', zIndex: 1 }}>
                {/* haha */}
                <DragDropContext onDragEnd={onDragEnd}>
                    
                    <Droppable droppableId="droppable">
                        
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                            >
                                <p>图层管理</p>
                                {items.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
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
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

            </div>
        </div>
    )
}

export default MapEntry;

