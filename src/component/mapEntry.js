import React, { useRef, useEffect } from 'react';
// import { mm } from '../asset/data/points1.json';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const MapEntry = props => {

    // var map = new AMap.Map('container', {
    //     center: [107.943579, 30.131735],
    //     zoom: 7
    // }); 

    let myRef = useRef(null);
    let tap1 = require('../asset/data/points1.json');
    let tap2 = require('../asset/data/points2.json');
    let tap3 = require('../asset/data/points3.json');

    var map;
   
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

        var geojson = new AMap.GeoJSON({
            geoJSON: tap3,
            // 还可以自定义getMarker和getPolyline

            // getPolyline: () => {
            //     console.log('as');
            // },
            // getMarker: (geojson, lnglats) => {
            //     var area = AMap.GeometryUtil.ringArea(lnglats[0])
            //     console.log(geojson);
            //     return new AMap.Polygon({
            //         path: lnglats,
            //         fillOpacity: 1 - Math.sqrt(area / 8000000000),// 面积越大透明度越高
            //         strokeColor: 'white',
            //         fillColor: 'red'
            //     });
            // },
        });

        geojson.setMap(map);

    }, [])

    // fake data generator
    const getItems = count =>
        Array.from({ length: count }, (v, k) => k).map(k => ({
            id: `item-${k}`,
            content: `item ${k}`
        }));

    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const grid = 8;

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
        width: 250
    });
    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
          return;
        }
    
        // const items = reorder(
        //   this.state.items,
        //   result.source.index,
        //   result.destination.index
        // );
    
        // this.setState({
        //   items
        // });
      }
    
    var items = getItems(10);

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
                                                {item.content}
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

