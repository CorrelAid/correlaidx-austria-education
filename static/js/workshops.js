/***************************************
 * WORKSHOP LOADER JS
 * Tilman Kerl
 * CorrelAid x Konstanz - Education
 ****************************************/

const GH_USER = "CorrelAid"
const REPO_NAME = "correlaidx-kn-education"
const BRANCH_NAME = "main"
const GH_URL = `https://raw.githubusercontent.com/${GH_USER}/${REPO_NAME}/${BRANCH_NAME}`;
const SETTINGS_URL = `${GH_URL}/settings.json`;
// const SETTINGS_URL = "https://gist.githubusercontent.com/MisterXY89/856d51e63ffadb3fbe2f1e22969394d5/raw/19d49526b16838fd73e1682465ad29386b20dcdc/settings.json";

async function read_workshops() {

	let url = `${GH_URL}/`
	return await fetch(SETTINGS_URL)
	.then(resp => resp.json())
	.then(json => {
		console.log(json);
		return json.active;
	})
	.catch(err => {
		console.log(err);
		return [];
	});

}

// https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

function get_dict_html(dt) {
	let html = "<table class='table table-hover table-borderless table-responsive'><thead></thead><tbody>";
	console.log(dt);
	Object.keys(dt).forEach(key => {
		html += `<tr>
	      			<th scope="row">${key}</th>
				      <td>${dt[key]}</td>
				    </tr>
			`;
	});
	html += "</tbody></table>";
	return html;
}


function get_html_for_ws(ws) {
	let ws_id = `ws_${ws.name.hashCode()}`;
	let ws_html = `<div class="col-md-6 col-sm-12 col-lg-4">
		<div class="card shadow-sm">
			<a data-bs-toggle="modal" data-bs-target="#${ws_id}" href="#">
				<img width="100%" height="225" src="static/img/${ws.images.thumbnail}" alt="Thumbnail image ${ws.name}">
			</a>
			<div class="card-body">
				<h3>${ws.name}</h3>
				<p class="card-text">${ws.teaser}</p>
				<div class="d-flex justify-content-between align-items-center">
					<div class="btn-group">
						<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${ws_id}">Mehr</button>
					</div>
					<!-- <small class="text-muted">Nächster Termin: ${ws.dates.next[0]}</small> -->
					<div class="align-items-center">
						${ws.tags.map(el => '<span class="badge bg-secondary">'+el+'</span>').join(" ")}
					</div>
					<div class="align-items-center"><i class="bi bi-calendar"></i> ${ws.dates.next[0]}</div>
				</div>
			</div>
		</div>
	</div>

	<div class="modal fade" id="${ws_id}" tabindex="-1" aria-labelledby="${ws_id}-ModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-xl">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="${ws_id}-ModalLabel">Workshop: ${ws.name}</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Schließen"></button>
				</div>
				<div class="modal-body ws-single-detail p-10">
					<div class="text-center pb-5">
						<div class="pb-5">
							<img src="static/img/${ws.images.hero}" width="200" height="200" class="round" alt="Hero image ${ws.name}" />
						</div>
						<h1>${ws.name}</h1>
						<p class="lead">
							${ws.sub}
						</p>
						<!-- text-muted -->
						<p class=""><i class="bi bi-people-fill"> </i> ${ws.authors.join(", ")}</p>
						<div class="align-item-center"><i class="bi bi-geo-alt-fill"></i> ${ws.venue}</div>
					</div>
					<div class="row">
						<h2>Beschreibung</h2>
						<div>${ws.description}</div>
					</div>

					<div class="row">
						<h2>Details</h2>
						<div>${get_dict_html(ws.details)}</div>
					</div>

					<div class="row">
						<h2>Zeitplan</h2>
						<div>${get_dict_html(ws.schedule)}</div>
					</div>
				</div>
				<div class="modal-footer">
          <a class="btn btn-success" href="${ws.register_link}" title="Opens a new window" target="blank">
            <i class="bi bi-box-arrow-in-up-right"></i>
            Anmelden
          </a>
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Schließen</button>
				</div>
			</div>
		</div>
	</div>
	`;
	return ws_html;
}


async function get_ws_details(ws_name) {
	console.log(ws_name);
	let url = `${GH_URL}/workshops/${ws_name}`;
	console.log(url);
	// let url = "https://gist.githubusercontent.com/MisterXY89/622f9a02b5959fb9d8e5221bacafd782/raw/22c8b6908f621ef4b1a1befc40d341e8096a0b42/intro_to_r.json";
	return await fetch(url)
	.then(resp => resp.json())
	.then(json => {
		return json;
	})
}

function load() {

	let ws_content = $("#ws-content");
	let spinner = $("#spinner");

	read_workshops()
	.then(workshops => {
		workshops.forEach(ws_name => {

			get_ws_details(ws_name)
			.then(ws_json => {

				let ws_html = get_html_for_ws(ws_json);
				ws_content.append(ws_html);
				spinner.toggle();

			});

		});

	});

}
