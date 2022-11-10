//@ts-check

export { Gauge }
const clamp = (/** @type {number} */ a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const round = (/** @type {number} */ a) => Math.round(a);

const lerp = (/** @type {number} */ x, /** @type {number} */ y, /** @type {number} */ a) => x * (1 - a) + y * a;
const
    scale = (/** @type {number[]} */ fromRange, /** @type {number[]} */ toRange) => {
        const d = (toRange[1] - toRange[0]) / (fromRange[1] - fromRange[0]);
        return (/** @type {number} */ from) => (from - fromRange[0]) * d + toRange[0];
    };
/**
 * @param s
 */
    class Gauge {
    /**
         * @param {any} wraper
         * @param {{ type: any; min: string; max: string; unit: string; }} option
         */
    constructor(wraper, option) {
        this.element = wraper;
        this.gauge = CreateDivWtihClassId(option.type, "ggauge");
        this.mask = CreateDivWtihClassId('mask', 'gmask');
        this.semiCircle = CreateDivWtihClassId('semi-circle', 'gsm');
        this.semiCircleMask = CreateDivWtihClassId('semi-circle--mask', "gsm-m");

        this.labelMin = CreateDivWtihClassId('gauge-label--min', 'gmin');
        this.labelMin.innerText = option.min;

        this.labelMax = CreateDivWtihClassId('gauge-label--max', "gmax");
        this.labelMax.innerText = option.max;

        this.labelValue = CreateDivWtihClassId('gauge-label--value', 'gvalue');
        this.labelValue.innerText = '0' + option.unit;


        this.labels = CreateDivWtihClassId('gauge-label flex-center column', 'glabel');

        this.labels.appendChild(this.labelMin);
        this.labels.appendChild(this.labelValue);
        this.labels.appendChild(this.labelMax);

        this.controlPlus = CreateDivWtihClassId("control-plus", "gplus");
        this.controlMinus = CreateDivWtihClassId("control-minus", "gminus");

        this.controls = CreateDivWtihClassId("gauge-control", "gcontrol");
        this.controls.appendChild(this.controlMinus);
        this.controls.appendChild(this.controlPlus);

        this.mask.appendChild(this.semiCircle);
        this.mask.appendChild(this.semiCircleMask);
        this.gauge.appendChild(this.mask);

        $(this.element).append(this.gauge);
        $(this.element).append(this.labels);
        $(this.element).append(this.controls);

        $(window).on('resize', function () {
            Style()
        })

        Style();
    };
}

function Style() {
    $('#ggauge').position({ my: 'bottom', at: 'center', of: $('#wrapergauge') })
    $('#glabel').position({ my: 'top', at: 'center', of: $('#wrapergauge') })
    // $(this.labelMin).position({ my: 'center', at: 'center', of: $('.gauge-label') })
    // $(this.labelMax).position({ my: 'center', at: 'center', of: $('.gauge-label') })
}

let turn = 0;
let ratio = 0.01;
let lastValue = 0;
let reset = false;
/**
 * @param {number} dir
 * @param {any} unit
 */
function Rotate(dir, unit) {
    console.log(dir);

    if (dir != lastValue) {
        if (lastValue < dir) {
            console.log('up');
        } else {
            console.log('down');
        }
    }
    lastValue = dir;
    // if (dir == 'up') {
    //     if (turn > .49) {
    //         turn -= ratio;
    //     } else {
    //         turn += ratio;
    //     }
    // }

    // if (dir == 'down') {
    //     if (turn < 0.01) {
    //         turn = 0;
    //         turn += ratio;

    //     } else {
    //         turn -= ratio;
    //     }
    // }
    // console.log(turn);
    // $('#gsm-m').css('rotate', turn + 'turn');
    // $('#gvalue').text('');
    // let val = Math.round(scale([0, .5], [20, 80])(turn));
    // $('#gvalue').text(val + ' ' + unit);
}
/**
 * @param {string} className
 * @param {string} id
 */
function CreateDivWtihClassId(className, id) {
    let div = document.createElement('div');
    div.className = className;
    div.id = id;

    return div;
}
