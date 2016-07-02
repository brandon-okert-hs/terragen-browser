"use strict";
var React = require("react");
var ReactDom = require("react-dom");
var NoiseBrowserList = require("./components/noise-browser-list/noise-browser-list.jsx");
var Button = require("./components/control/button/button.jsx");

require("./index.less");

class App extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            page: "Main"
        };

        this.changePage = this.changePage.bind(this);
        this.onPageReload = this.onPageReload.bind(this);
        this.onPageRefresh = this.onPageRefresh.bind(this);
    }

    componentDidMount () {
        window.addEventListener("popstate", this.onPageReload);
        window.onload = this.onPageRefresh;
    }

    onPageRefresh () {
        this.setState({page: history.state && history.state.page ? history.state.page : "Main"});
    }

    onPageReload (e) {
        if (!e || typeof e !== "object" || !e.state) {
            this.setState({page: "Main"});
        } else {
            this.setState({page: e.state.page});
        }
    }

    changePage (newPage) {
        history.pushState({page: newPage}, newPage, "/");
        this.setState({
            page: newPage
        });
    }

    renderMainPage () {
        return (
            <div className="-mainPage">
                <div className="-column">
                    <p className="-title">1D</p>
                    <Button onClick={() => this.changePage("SinusoidalBrowser")}>Spectral Noise</Button>
                </div>
                <div className="-column">
                    <p className="-title">2D</p>
                </div>
                <div className="-column">
                    <p className="-title">3D</p>
                </div>
            </div>
        );
    }

    renderBrowserList () {
        return (
            <NoiseBrowserList
                browserList={[{
                        displayName: "Red Noise",
                        endpoint: "http://localhost:8080/noise",
                        noiseFunction: "red"
                    },{
                        displayName: "Pink Noise",
                        endpoint: "http://localhost:8080/noise",
                        noiseFunction: "pink"
                    },{
                        displayName: "White Noise",
                        endpoint: "http://localhost:8080/noise",
                        noiseFunction: "white"
                    },{
                        displayName: "Blue Noise",
                        endpoint: "http://localhost:8080/noise",
                        noiseFunction: "blue"
                    },{
                        displayName: "Violet Noise",
                        endpoint: "http://localhost:8080/noise",
                        noiseFunction: "violet"
                    }]}
                description="Spectral Noise is created from random sinusoids of various frequencies, combined via a weighted sum, where the weights are related to the frequency"
                generator="Random"
                presetCollectionName="Spectral Noise"
                synthesizer="Octave"
                transformer="Sinusoid"
            />
        );
    }

    render () {
        let page;
        switch (this.state.page) {
            case "Main":
                page = this.renderMainPage();
                break;
            case "SinusoidalBrowser":
                page = this.renderBrowserList();
                break;
            default:
                page = null;
        }

        return (
            <div className="App">
                {page}
            </div>
        );
    }
}

App.displayName = "App";

App.propTypes = {};

ReactDom.render(<App />, document.getElementById("app"));
