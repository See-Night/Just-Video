import React from "react"

type PropsType = {
    volume: number

    changeVolume: (volume: number) => void
}
type StateType = {
    onHover: boolean
    onClick: boolean
}

interface VolumeBar {
    props: PropsType
    state: StateType
}

class VolumeBar extends React.Component {
    constructor(props: PropsType) {
        super(props)
        this.state = {
            onHover: false,
            onClick: false
        }
    }

    onHover() {
        this.setState({
            onHover: true
        })
    }

    afterHover() {
        this.setState({
            onHover: false
        })
    }

    changeVolume(v: number) {
        this.props.changeVolume(v)
    }

    onClick(e: React.MouseEvent) {
        let control_bar = document.getElementById("control-bar")
        if (control_bar) {
            let volume: number = (control_bar.offsetTop - e.clientY - 16) / 144
            this.changeVolume(volume)
        }
    }

    dragVolume(e: React.MouseEvent) {
        if (this.state.onClick) {
            let control_bar = document.getElementById("control-bar")
            if (control_bar) {
                let volume: number = (control_bar.offsetTop - e.clientY - 16) / 144
                this.changeVolume(volume)
            }
        }
    }

    render(): React.ReactNode {
        return (
            <div className="w-12 h-auto relative" onMouseEnter={e => this.onHover()} onMouseLeave={e => this.afterHover()}>
                <div
                    className="w-12 bg-slate-500 rounded-xl overflow-hidden shadow-xl transition-all relative flex justify-end items-end"
                    id="volume-bar"
                    style={{
                        opacity: this.state.onHover ? .8 : 0,
                        height: this.state.onHover ? "9rem" : 0,
                        marginBottom: this.state.onHover ? "1rem" : 0
                    }}
                    onClick={this.onClick.bind(this)}
                    onMouseDown={e => this.setState({ onClick: true })}
                    onMouseUp={e => this.setState({ onClick: false })}
                    onMouseMove={this.dragVolume.bind(this)}
                    onMouseLeave={e => this.setState({ onClick: false })}>
                    <div
                        className="w-full bg-white"
                        style={{ height: `${Math.floor(this.props.volume * 100)}%` }}>
                    </div>
                </div>
                <div className="control-btn">
                    <svg className={`${this.props.volume > 0.5 ? "" : "hidden"}`} width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 6V42C17 42 11.7985 32.8391 11.7985 32.8391H6C4.89543 32.8391 4 31.9437 4 30.8391V17.0108C4 15.9062 4.89543 15.0108 6 15.0108H11.7985C11.7985 15.0108 17 6 24 6Z" fill="none" className="stroke-white" strokeWidth="4" strokeLinejoin="round" /><path d="M32 15L32 15C32.6232 15.5565 33.1881 16.1797 33.6841 16.8588C35.1387 18.8504 36 21.3223 36 24C36 26.6545 35.1535 29.1067 33.7218 31.0893C33.2168 31.7885 32.6391 32.4293 32 33" className="stroke-white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M34.2359 41.1857C40.0836 37.6953 44 31.305 44 24C44 16.8085 40.2043 10.5035 34.507 6.97906" className="stroke-white" strokeWidth="4" strokeLinecap="round" /></svg>
                    <svg className={`${this.props.volume > 0 && this.props.volume <= 0.5 ? "" : "hidden"}`} width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 6V42C17 42 11.7985 32.8391 11.7985 32.8391H6C4.89543 32.8391 4 31.9437 4 30.8391V17.0108C4 15.9062 4.89543 15.0108 6 15.0108H11.7985C11.7985 15.0108 17 6 24 6Z" fill="none" className="stroke-white" strokeWidth="4" strokeLinejoin="round" /><path d="M32 15L32 15C32.6232 15.5565 33.1881 16.1797 33.6841 16.8588C35.1387 18.8504 36 21.3223 36 24C36 26.6545 35.1535 29.1067 33.7218 31.0893C33.2168 31.7885 32.6391 32.4293 32 33" className="stroke-white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <svg className={`${this.props.volume == 0 ? "" : "hidden"}`} width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect opacity="0.01" x="30" y="18" width="13" height="13" fill="#333" /><mask id="icon-2ddeeaee6a0e536" maskUnits="userSpaceOnUse" x="30" y="18" width="13" height="13" style={{ maskType: "alpha" }}><rect x="30" y="18" width="13" height="13" fill="#333" /></mask><g mask="url(#icon-2ddeeaee6a0e536)"><path d="M40.7348 20.2858L32.2495 28.7711" className="stroke-white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M32.2496 20.2858L40.7349 28.7711" className="stroke-white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></g><path d="M24 6V42C17 42 11.7985 32.8391 11.7985 32.8391H6C4.89543 32.8391 4 31.9437 4 30.8391V17.0108C4 15.9062 4.89543 15.0108 6 15.0108H11.7985C11.7985 15.0108 17 6 24 6Z" fill="none" className="stroke-white" strokeWidth="4" strokeLinejoin="round" /></svg>
                </div>
            </div>
        )
    }
}

export default VolumeBar