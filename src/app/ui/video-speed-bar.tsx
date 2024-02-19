import React from "react"

type PropsType = {
    speed: number

    changeSpeed: (speed: number) => void
}
type StateType = {
    onHover: boolean
}

interface SpeedBar {
    props: PropsType
    state: StateType
}

class SpeedBar extends React.Component {
    constructor(props: PropsType) {
        super(props)
        this.state = {
            onHover: false
        }

        this.changeSpeed = this.changeSpeed.bind(this)
    }

    changeSpeed(s: number) {
        this.props.changeSpeed(s)
    }

    render(): React.ReactNode {
        return (
            <div
                className="w-12 h-auto relative mr-4"
                onMouseEnter={e => this.setState({ onHover: true })}
                onMouseLeave={e => this.setState({ onHover: false })}
            >
                <div className={`relative w-24 flex justify-center items-center rounded-lg contrast-125 overflow-hidden -translate-x-6 transition-all`}>
                    <div className={`w-24 bg-slate-500 rounded-lg overflow-hidden transition-all shadow-lg opacity-75 ${this.state.onHover ? "mb-4 h-[15rem]" : "mb-0 h-0"}`}>
                        <div className={`w-full text-center text-white p-2 hover:bg-slate-700 ${this.props.speed == 0.5 ? "bg-slate-700" : ""}`} onClick={e => this.changeSpeed(0.5)}>0.5</div>
                        <div className={`w-full text-center text-white p-2 hover:bg-slate-700 ${this.props.speed == 1 ? "bg-slate-700" : ""}`} onClick={e => this.changeSpeed(1)}>1</div>
                        <div className={`w-full text-center text-white p-2 hover:bg-slate-700 ${this.props.speed == 1.25 ? "bg-slate-700" : ""}`} onClick={e => this.changeSpeed(1.25)}>1.25</div>
                        <div className={`w-full text-center text-white p-2 hover:bg-slate-700 ${this.props.speed == 1.5 ? "bg-slate-700" : ""}`} onClick={e => this.changeSpeed(1.5)}>1.5</div>
                        <div className={`w-full text-center text-white p-2 hover:bg-slate-700 ${this.props.speed == 2 ? "bg-slate-700" : ""}`} onClick={e => this.changeSpeed(2)}>2</div>
                        <div className={`w-full text-center text-white p-2 hover:bg-slate-700 ${this.props.speed == 3 ? "bg-slate-700" : ""}`} onClick={e => this.changeSpeed(3)}>3</div>
                    </div>
                    
                </div>
                <div className="control-btn text-lg hover:bg-slate-700 flex flex-row justify-center items-center">
                    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M34.0234 6.68921C31.0764 4.97912 27.6525 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 20.3727 43.0344 16.9709 41.3461 14.0377" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M31.9498 16.0503C31.9498 16.0503 28.5621 25.0948 27.0001 26.6569C25.438 28.219 22.9053 28.219 21.3432 26.6569C19.7811 25.0948 19.7811 22.5621 21.3432 21C22.9053 19.4379 31.9498 16.0503 31.9498 16.0503Z" fill="none" stroke="#fff" strokeWidth="4" strokeLinejoin="round" /></svg>
                </div>
            </div>
        )
    }
}

export default SpeedBar