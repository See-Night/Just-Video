import React from "react"

type PropsType = {
    fullscreen: boolean

    fullScreen: () => void
}
type StateType = {}

interface FullScreenBtn {
    props: PropsType
    state: StateType
}

class FullScreenBtn extends React.Component {
    constructor(props: PropsType) {
        super(props)
        this.state = {}
    }

    onClick(e: React.MouseEvent) {
        this.props.fullScreen()
    }

    render(): React.ReactNode {
        return (
            <div className='control-btn cursor-pointer hoverable' id='play-btn' onClick={this.onClick.bind(this)}>
                <svg className={`${this.props.fullscreen ? "hidden" : ""}`} width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M33 6H42V15" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M42 33V42H33" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M15 42H6V33" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M6 15V6H15" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <svg className={`${this.props.fullscreen ? "" : "hidden"}`} width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M33 6V15H42" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M15 6V15H6" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M15 42V33H6" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M33 42V33H41.8995" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
        )
    }
}

export default FullScreenBtn