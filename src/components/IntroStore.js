import React from "react";
import srcImg from "../css/images/pt1.jpg";

class IntroStore extends React.Component {
	myInput = React.createRef();
	imgInfo = React.createRef();

	goToLocation = (event) => {
		// 1. prevent event to submitting!!
		event.preventDefault();
		// 2. change the page to delivery
		this.props.history.push(`/store/delivery/`);
	}

	constructor(props) {
  super(props);

  this.handleScroll = this.handleScroll.bind(this);
	}

	componentDidMount() {
	  function debounce(func, wait = 20, immediate = true) {
	    var timeout;
	    return function (){
	      var context = this, args = arguments;
	      var later = function() {
	        timeout = null;
	        if(!immediate) func.apply(context, args);
	      };
	      var callNow = immediate && !timeout;
	      clearTimeout(timeout);
	      timeout = setTimeout(later, wait);
	      if(callNow) func.apply(context, args);
	    };
		};
	  window.addEventListener('scroll', debounce(this.handleScroll));
	};

	componentWillUnmount() {
	  window.removeEventListener('scroll', this.handleScroll);
	};
// VER ERRO QUE DÁ AO VOLTAR PAGINA DA STORE PARA INTRO E DESCER PAGINA
	handleScroll(event) {
		const sliderImage = this.imgInfo.current;
		if (sliderImage) {
		  const slideInAt = (event.currentTarget.scrollY + event.currentTarget.innerHeight) - sliderImage.clientHeight / 2;
		  const isHalfShown = slideInAt > sliderImage.offsetTop;
	    if (isHalfShown) {
	      sliderImage.classList.add('active');
	    }
		}
	};

	render() {
		const srcImgName = "Foto1";

		return (
			<div className="content">
				<header className="header">
					<form className="store-selector" onSubmit={this.goToLocation}>
						<h2>Please Enter The Store</h2>
						<input 
							type="text"
							required 
							defaultValue={"Owl-in-the-Tree"} 
						/>
						<button type="submit">Visit Store</button>
					</form>
					<div className="below">
						<h2>See content below</h2>
						<div className="arrow bounce">&#9759;</div>
					</div>
				</header>
				<div className="text_content">
					<div className="text_content-about">
						<h2>About</h2>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales libero non nisl aliquet
						 congue. Mauris ut luctus nulla. Curabitur non lectus a risus feugiat efficitur vel ullamcorper felis. 
						 Proin a commodo neque. Etiam tempor pretium mollis. Nunc egestas quis mauris in tincidunt. Nam sed rutrum 
						 nisi. Ut et purus eget sem laoreet semper. Nullam sagittis velit vitae purus pretium venenatis. 
						 Etiam in maximus justo. Suspendisse dictum mauris lorem, blandit consequat nisl ornare sed. 
						 Vivamus id dui a massa aliquet dictum eget a nibh. Ut vitae purus a mi lacinia aliquam. 
						 Phasellus pharetra orci in tincidunt aliquet.
						</p>
					</div>
					<div className="text_content-info">
						<div className="text_content-info--txt">
							<h2>Content</h2>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales libero non nisl aliquet
							 congue. Mauris ut luctus nulla. Curabitur non lectus a risus feugiat efficitur vel ullamcorper felis. 
							 Proin a commodo neque. Etiam tempor pretium mollis. Nunc egestas quis mauris in tincidunt. Nam sed rutrum 
							 nisi. Ut et purus eget sem laoreet semper. Nullam sagittis velit vitae purus pretium venenatis. 
							 Etiam in maximus justo. Suspendisse dictum mauris lorem, blandit consequat nisl ornare sed. 
							 Vivamus id dui a massa aliquet dictum eget a nibh. Ut vitae purus a mi lacinia aliquam. 
							 Phasellus pharetra orci in tincidunt aliquet.
							</p>
						</div>
						<div className="text_content-info--img" name="imgInfo" ref={this.imgInfo}>
							<img src={srcImg} alt={srcImgName} />
						</div>
					</div>
					{/*<div className="text_content-info">
						<div className="text_content-info--txt">
						<div className="text_content-info--img" name="imgInfo" ref={this.imgInfo}>
							<img src={srcImg} alt={srcImgName} />
						</div>
							<h2>Content</h2>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales libero non nisl aliquet
							 congue. Mauris ut luctus nulla. Curabitur non lectus a risus feugiat efficitur vel ullamcorper felis. 
							 Proin a commodo neque. Etiam tempor pretium mollis. Nunc egestas quis mauris in tincidunt. Nam sed rutrum 
							 nisi. Ut et purus eget sem laoreet semper. Nullam sagittis velit vitae purus pretium venenatis. 
							 Etiam in maximus justo. Suspendisse dictum mauris lorem, blandit consequat nisl ornare sed. 
							 Vivamus id dui a massa aliquet dictum eget a nibh. Ut vitae purus a mi lacinia aliquam. 
							 Phasellus pharetra orci in tincidunt aliquet.
							</p>
						</div>
					</div>*/}
				</div>
			</div>
		)
	}
}

export default IntroStore;