import React from 'react';
import { Treemap } from 'react-vis';

export default class TreeMap extends React.Component {

    render() {
        const STYLES = {
            SVG: {
                stroke: '#000',
                strokeWidth: 1
            },
            DOM: {
                border: 'thin solid #ddd'
            }
        };

        const myData = {
            "color": "#12939A",
            "children": [
                {
                    "title": "Level 2",
                    "color": "#3a9a4c",
                    "size": 50
                },
                {
                    "title": "Level 3",
                    "color": "#3a9a4c",
                    "size": 25
                },
                {
                    "title": "Level 4",
                    "color": "#3a9a4c",
                    "size": 25
                }
            ]
        }

        return(
            <Treemap {...{
                width: 450,
                height: 450,
                data: myData,
                margin: 30,
                renderMode:'SVG',
                mode:"squarify",
                colorType: 'literal',
                colorRange: ['#88572C'],
                style:STYLES.SVG,
                getSize: d => d.size,
                getColor: d => d.color,
                getLabel: d => d.name
            }}/>
        );
    }
}