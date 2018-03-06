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
            "hex": "#00bcd4",
            "children": [
                {
                    "title": "A",
                    "hex": "#80d689",
                    "size": 3000,
                    "children": [
                        {"title": "1", "hex": "#12939A", "value": 3938},
                        {"title": "2", "hex": "#12939A", "value": 3812}
                    ],
                },
                {
                    "title": "B",
                    "hex": "#80d689",
                    "children": [
                        {"title": "3", "hex": "#12939A", "value": 17010},
                        {"title": "4", "hex": "#12939A", "value": 5842}
                    ]
                },
                {
                    "title": "C",
                    "hex": "#80d689",
                    "children": [
                        {"title": "5", "hex": "#12939A", "value": 721},
                        {"title": "6", "hex": "#12939A", "value": 4294}
                    ]
                },
                {
                    "title": "F",
                    "hex": "#80d689",
                    "children": [
                        {"title": "7", "hex": "#12939A", "value": 1302},
                        {"title": "8", "hex": "#12939A", "value": 2138}
                    ]
                }
            ]
        };

        return(
            <Treemap {...{
                width: 450,
                height: 450,
                data: myData,
                margin: 15,
                renderMode:'SVG',
                mode:"circlePack",
                colorType: 'literal',
                colorRange: ['#88572C'],
                style:STYLES.SVG,
                getSize: d => d.value,
                getColor: d => d.hex,
                getLabel: d => d.name
            }}/>
        );
    }
}