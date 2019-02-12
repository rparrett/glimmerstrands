class Line {
    data: Array<number>;
    min: number;
    max: number;
    style: string;

    constructor(data: Array < number >, style: string = "") {
        this.style = style;
        this.data = data;  

        let min = Number.MAX_VALUE;
        let max = Number.MIN_VALUE;

        data.forEach(function (num) { 
            if (num < min) {
                min = num;
            }
            if (num > max) {
                max = num;
            }
        })

        this.min = min;
        this.max = max;        
    }

    addPoint(point: number) {
        if (point < this.min) {
            this.min = point;
        }

        if (point > this.max) {
            this.max = point;
        }

        this.data.push(point);
    }
}

class GlimmerStrands {
    lines: Array<Line> = [];
    min: number;
    max: number;
    el: Element;

    constructor(container: Element) {
        this.el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.el.setAttribute('width', "100%");
        this.el.setAttribute('height', "100%");
        this.el.setAttribute('viewBox', "0 -0.1 1 1.1");
        this.el.setAttribute('preserveAspectRatio', "none");
        container.appendChild(this.el);
    }

    addLine(line: Line) {
        this.lines.push(line);
    }

    addData(data: Array<number>) {
        let _this = this;
        data.forEach(function (point, index) { 
            _this.lines[index].addPoint(point);
        });
    }

    clear() {
        while (this.el.firstChild) {
            this.el.firstChild.remove();
        }
    }

    render() {
        let _this = this;

        let min = Number.MAX_VALUE;
        let max = Number.MIN_VALUE;
        this.lines.forEach(function (line) { 
            if (line.min < min) {
                min = line.min;
            }
            if (line.max > max) {
                max = line.max;
            }
        });

        this.clear();

        this.lines.forEach(function (line) { 
            if (line.data.length <= 1) {
                return;
            }

            let polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
            polyline.setAttribute('vector-effect', "non-scaling-stroke");
            let points: Array<string> = [];
            line.data.forEach(function (dataPoint, index) {
                let x = index * 1.0 / (line.data.length - 1);
                let y = 1.0 - dataPoint / max;

                points.push(x.toString() + "," + y.toString());  
            });
            polyline.setAttribute("points", points.join(" "));
            polyline.setAttribute("style", line.style);
            _this.el.appendChild(polyline);
        });        
    }
}
