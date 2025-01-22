<div class="card-body d-flex flex-column justify-content-center text-center">
    <h2 id="writing_question" class="fs-1 text-light"></h2>
    <form>
        <div class="mb-3">
            <input class="form-control" id="writing_answer" type="text" placeholder="Type the sentence here"
                aria-label="default input" />
        </div>
        <button id="writing_check" type="submit" class="btn">Check</button>
    </form>
</div>

<div class="card-footer position-relative">
    <button id="writing_start" class="btn btn--red">
        <i class="fas fa-power-off"></i> Start
    </button>
    <button id="writing_next" class="btn btn--red">
        <i class="fas fa-play"></i> Next
    </button>
    <div class="progress mt-3" role="progressbar" aria-label="Example 30px high" aria-valuenow="0" aria-valuemin="0"
        aria-valuemax="100" style="height: 30px">
        <div id="writing_progress_bar" class="progress-bar" style="width: 0%"></div>
    </div>

    <div class="text-light">
        <h4>Keyboard buttons control:</h4>
        <div>
            <i class="fa-solid fa-square-caret-left"></i> - return
            last sentence
        </div>
        <div>
            <i class="fa-solid fa-square-caret-right"></i> - call next
            sentence
        </div>
        <div>[Spacebar] - start from begining</div>
    </div>
</div>