<div class="translate card-body d-flex gap-5 flex-column justify-content-center text-center">
    <h2 id="translate_question" class="translate__question fs-1 text-light"></h2>
    <h4 id="translate_answer" class="translate__answer mb-2 text-light text-opacity-50">
    </h4>
</div>

<div class="card-footer position-relative">
    <input class="btn btn--red mr-2" type="text" placeholder="Leave a number here" aria-label="default input example"
        id="translate_delay" />
    <div class="translate__popup"></div>
    <button id="translate_btn_start" class="btn btn--red mr-2">
        <i class="fas fa-power-off"></i> Start
    </button>
    <button id="translate_btn_continue" class="btn btn--red">
        <i class="fas fa-play"></i> Continue
    </button>
    <button id="translate_btn_stop" class="btn btn--red">
        <i class="fas fa-pause"></i> Stop level
    </button>
    <div class="progress mt-3" role="progressbar" aria-label="Example 30px high" aria-valuenow="0" aria-valuemin="0"
        aria-valuemax="100" style="height: 30px">
        <div id="translate_progress_bar" class="progress-bar" style="width: 0%"></div>
    </div>

    <div class="text-light">
        <h4>Keyboard buttons control:</h4>
        <div>[Del] - Delete the sentence</div>
        <div>
            <i class="fa-solid fa-square-caret-left"></i> - return
            last card
        </div>
        <div>
            <i class="fa-solid fa-square-caret-right"></i> - call next
            card
        </div>
        <div>
            <i class="fa-solid fa-square-caret-up"></i><i class="fa-solid fa-square-caret-down"></i> - To
            increase or decrease the delay time by 0.5 second
        </div>
        <div>[Spacebar] - start from begining</div>
    </div>
</div>