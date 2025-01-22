<div class="card-body d-flex flex-column justify-content-center text-center">
    <h2 id="dragdrop_question" class="dragdrop__question fs-1 text-light"></h2>
    <div id="dragdrop_answer" class="dragdrop__answer mb-2 position-relative h-50 fs-4 link-body-emphasis"></div>
</div>

<div class="card-footer position-relative">
    <button id="dragdrop_btn_start" class="btn btn--red">
        <i class="fas fa-power-off"></i> Start
    </button>
    <button id="dragdrop_btn_check" class="btn btn--red">
        <i class="fas fa-play"></i> Check and Continue
    </button>
    <div class="progress mt-3" role="progressbar" aria-label="Example 30px high" aria-valuenow="0" aria-valuemin="0"
        aria-valuemax="100" style="height: 30px">
        <div id="drag_drop_progress_bar" class="progress-bar" style="width: 0%"></div>
    </div>

    <div class="text-light">
        <h4>Keyboard buttons control:</h4>
        <div>
            <i class="fa-solid fa-square-caret-left"></i> - return
            last sentence
        </div>
        <div>
            <i class="fa-solid fa-square-caret-right"></i> - check
            result and call next sentence
        </div>
        <div>[Spacebar] - start from begining</div>
    </div>
</div>