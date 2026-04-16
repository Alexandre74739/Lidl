import Geoloc from "../modal/goelocalisation";

export default function Modal() {
    return (
        <div className="modal">
            <h1>Venez nous rejoindre et commander</h1>
            <p>Cumuler vos points de fidélite avec l'app Lidl Collect</p>
            <Geoloc />
        </div>
    );
}