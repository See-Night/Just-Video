import React from "react"

type PropsType = {
    paused: boolean

    play: () => void
    pause: () => void
}
type StateType = {}

interface PlayBtn {
    props: PropsType
    state: StateType
}

class PlayBtn extends React.Component {
    constructor(props: PropsType) {
        super(props)
        this.state = {}
    }

    onClick(e: React.MouseEvent) {
        console.log(this.props.paused)
        if (this.props.paused) {
            this.props.play()
        } 
        else {
            this.props.pause()
        }
    }

    render(): React.ReactNode {
        return (
            <div className='control-btn cursor-pointer hoverable' id='play-btn' onClick={this.onClick.bind(this)}>
                <svg className={`${this.props.paused ? "" : "hidden"}`} width="34" height="34" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 24V11.8756L25.5 17.9378L36 24L25.5 30.0622L15 36.1244V24Z" fill="none" stroke="#fff" strokeWidth="4" strokeLinejoin="round" /></svg>
                <svg className={`${this.props.paused ? "hidden" : ""}`} width="34" height="34" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 12V36" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M32 12V36" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
        )
    }
}

export default PlayBtn