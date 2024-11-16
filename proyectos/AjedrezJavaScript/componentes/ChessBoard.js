class ChessBoard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    static get styles() {
        return /* css */`
        :host{
            --piece-size: 54px;
            --cell-size:72px
            --board-size: 576px;
        }
    }
    `;
    }

    connectecCallbacK() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = /* html */`
    <style>
        ${ChessBoard.styles}
    </style>
    <div>
        Chess Board
    </div>
    `;
    }
}

customElements.define("chess-board", ChessBoard);