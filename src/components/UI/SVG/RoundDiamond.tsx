import React, { useState } from 'react';

interface RoundDiamondProps {
  /** Hex  or color name for fill color of SVG.  Default is #000 */
  fillColor?: string;
  width?: string;
  height?: string;
}

export const RoundDiamond: React.FC<RoundDiamondProps> = ({
  fillColor = '#000',
  width = '3rem',
  height = '3rem',
}) => {
  const [toggleFillColor, setToggleFillColor] = useState(false);

  return (
    <div onClick={() => setToggleFillColor(!toggleFillColor)}>
      <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 153 135"
        aria-labelledby="title"
        width={width}
        height={height}
      >
        <title>Round Diamond</title>
        <path
          fill={toggleFillColor ? fillColor : '#000'}
          d="M126.138,68.433c.274,24.55-18.216,46.166-44.043,49.611-12.008,1.6-23.014-1.362-33.049-8.032A51.2,51.2,0,0,1,29.775,86.685,52.129,52.129,0,0,1,26.232,62.7a46.268,46.268,0,0,1,5.242-19.3c7.72-14.178,19.615-22.774,35.439-25.656A50.86,50.86,0,0,1,98.02,21.95c6.532,3.034,11.6,7.9,16.213,13.276a47.838,47.838,0,0,1,8.517,13.267A52.409,52.409,0,0,1,126.138,68.433Zm-23.751-.791c0-2.96-.062-5.921.024-8.879a5.132,5.132,0,0,0-1.654-4.034c-4.11-4.146-8.366-8.152-12.25-12.518a4.173,4.173,0,0,0-3.381-1.455q-9,.057-18,0a4.428,4.428,0,0,0-3.384,1.476q-6.3,6.431-12.667,12.786a4.437,4.437,0,0,0-1.394,3.409q.063,9,0,18a4.736,4.736,0,0,0,1.453,3.633q6.33,6.394,12.539,12.908a4.529,4.529,0,0,0,3.592,1.513q8.759-.083,17.519,0A4.586,4.586,0,0,0,88.394,93q6.257-6.467,12.63-12.823a4.384,4.384,0,0,0,1.379-3.415C102.348,73.723,102.386,70.682,102.387,67.642Zm18.686-17.465a2.541,2.541,0,0,0-1.211-2.653c-3.778-2.666-7.517-5.387-11.292-8.056-1.379-.975-1.777-.85-2.062.721-.853,4.7-1.63,9.422-2.453,14.132a2.416,2.416,0,0,0,1.175,2.641c1.39.932,2.745,1.917,4.114,2.88,2.609,1.834,5.2,3.689,7.833,5.492,1.105.758,1.48.59,1.765-.735.2-.932.273-1.892.413-2.838Q120.211,55.969,121.073,50.177ZM48.1,54.96c-.043-.493-.047-.735-.087-.971-.8-4.648-1.58-9.3-2.42-13.941-.253-1.4-.7-1.544-1.957-.66-2.942,2.072-5.847,4.2-8.774,6.292-4.63,3.312-4.112,2.314-3.326,7.767.536,3.718,1.064,7.438,1.683,11.142.236,1.409.6,1.547,1.738.756,4.006-2.784,7.975-5.62,11.961-8.433A2.172,2.172,0,0,0,48.1,54.96ZM88.864,39.1c-.013,0,.3-.06.615-.108q6.857-1.05,13.714-2.1c1.87-.289,1.973-.467.949-2.035-1.832-2.8-3.943-5.454-5.516-8.395-1.621-3.031-3.615-4.069-7.062-3.388-4.131.816-8.381,1.029-12.576,1.533-1.262.151-1.534.571-.884,1.494,2.893,4.109,5.839,8.18,8.78,12.255A1.9,1.9,0,0,0,88.864,39.1Zm-14.16,71c-.575-.871-.907-1.412-1.275-1.926-2.376-3.316-4.865-6.557-7.1-9.967a4.029,4.029,0,0,0-4.6-2.037c-4.172.731-8.374,1.293-12.558,1.962-.659.105-1.464.044-1.907,1.009,2.805,4.107,5.649,8.258,8.477,12.421a1.882,1.882,0,0,0,2.044.869c2.057-.3,4.138-.431,6.188-.76C67.429,111.11,70.942,110.94,74.7,110.1Zm2.509.16c6.087.749,11.635,1.409,17.175,2.13,1.188.155,1.736-.5,2.3-1.33,2.017-2.981,4.061-5.944,6.1-8.912.5-.725,1.031-1.428,1.5-2.17.738-1.162.63-1.389-.771-1.736-.387-.1-.787-.139-1.182-.2q-4.981-.749-9.962-1.5c-4.858-.733-4.866-.74-7.77,3.314C82.237,103.164,79.894,106.483,77.213,110.256Zm29.594-13.974a2.4,2.4,0,0,0,1.8-.766c3.469-2.562,6.883-5.2,10.4-7.688a3.468,3.468,0,0,0,1.563-3.683c-.451-3.321-.831-6.652-1.287-9.972-.224-1.631-.1-3.336-.878-4.919a2.342,2.342,0,0,0-.735.179c-4.252,2.976-8.487,5.976-12.742,8.948a2.252,2.252,0,0,0-.838,2.539c.345,1.966.66,3.936,1.008,5.9C105.658,89.954,106.23,93.084,106.807,96.283ZM57.541,22.834c-.988-.3-1.632.217-2.164,1.016-2.482,3.726-5,7.428-7.445,11.176-.813,1.245-.616,1.6.92,1.845,4.733.76,9.475,1.463,14.208,2.222a2.081,2.081,0,0,0,2.286-.87c2.816-3.98,5.678-7.928,8.478-11.92.786-1.12.575-1.54-.768-1.7C67.9,24,62.738,23.425,57.541,22.834ZM44.762,96.492a1.818,1.818,0,0,0,.8-1.28c.809-4.644,1.574-9.3,2.428-13.931a3.071,3.071,0,0,0-1.5-3.437c-3.884-2.674-7.712-5.429-11.566-8.146-.381-.269-.753-.63-1.337-.341a27.054,27.054,0,0,0-.846,5.391q-.632,4.63-1.2,9.268c-.144,1.191-.271,2.374.917,3.255C36.564,90.309,40.633,93.39,44.762,96.492Zm3.463-38.344a1.432,1.432,0,0,0-1.253.333C43.252,61.1,39.52,63.7,35.826,66.357c-1.5,1.075-1.494,1.321.015,2.4,3.5,2.51,7.045,4.967,10.572,7.444a5.438,5.438,0,0,0,.6.391c.974.506,1.323.355,1.442-.674a14.745,14.745,0,0,0,.031-1.675c0-4.55.009-9.1-.008-13.65A5.151,5.151,0,0,0,48.224,58.147ZM85.5,95.71c-6.014,0-11.825-.024-17.635.02-1.154.009-1.35.5-.6,1.563q3.851,5.479,7.8,10.888c.892,1.215,1.16,1.174,2.1-.125q3.51-4.842,6.957-9.729A5.78,5.78,0,0,0,85.5,95.71ZM49.345,81.032c-.836,4.878-1.689,9.649-2.452,14.435-.218,1.369.088,1.623,1.676,1.4,4.34-.609,8.672-1.283,13-1.973,1.169-.186,1.3-.612.569-1.613a11.346,11.346,0,0,0-1.107-1.254q-4.861-4.95-9.738-9.884A2.652,2.652,0,0,0,49.345,81.032Zm54.935-22.75a.825.825,0,0,0-.4.829c-.012,5.426-.045,10.852,0,16.278.012,1.641.4,1.789,1.855.781q5.307-3.688,10.571-7.438c1.493-1.065,1.5-1.337,0-2.4-3.573-2.548-7.173-5.057-10.772-7.568C105.164,58.5,104.8,58.115,104.28,58.282ZM89,40.466,102.68,53.9a45.569,45.569,0,0,0,1.215-6.3c.5-2.664.961-5.339,1.342-8.022.2-1.39-.054-1.588-1.383-1.447-.871.093-1.734.262-2.6.4ZM102.641,80.9c-.219-.024-.327-.069-.366-.035-4.454,3.9-8.259,8.431-12.412,12.623-.718.724-.478,1.2.617,1.4,1.808.321,3.625.588,5.441.863,2.447.37,4.888.793,7.346,1.065,1.648.182,2.036-.266,1.886-1.886-.088-.951-.286-1.894-.461-2.836C104,88.354,103.541,84.564,102.641,80.9ZM63.095,40.755a12.369,12.369,0,0,0-4.157-.958c-3.389-.541-6.779-1.075-10.175-1.569-1.67-.243-2,.109-1.854,1.792.028.317.1.63.157.945.608,3.54,1.182,7.086,1.85,10.615.165.874.068,1.89.551,2.4ZM76,39.3V39.3c2.637,0,5.275.043,7.91-.017,1.409-.032,1.627-.442.835-1.577q-3.7-5.309-7.511-10.54c-.953-1.306-1.442-1.314-2.364-.05q-3.812,5.229-7.512,10.54c-.858,1.23-.634,1.6.971,1.638C70.885,39.343,73.443,39.3,76,39.3ZM92.548,113.8c-.156-.358-.493-.347-.8-.387q-7.232-.939-14.466-1.87a11.925,11.925,0,0,0-3.1.076c-3.318.444-6.639.86-9.958,1.3-1.465.2-2.924.43-4.635.683C67.171,118.294,85.392,118.056,92.548,113.8ZM59.1,21.439c5.763.769,11.483,2.042,17.286,1.98,5.542-.06,11.029-1.12,16.522-2.011C81.633,17.641,70.376,17,59.1,21.439Zm-5.545,2.8-.469-.494a45.521,45.521,0,0,0-21.217,22.1,2.14,2.14,0,0,0,1.153-.437q5.557-3.985,11.1-7.989a5.721,5.721,0,0,0,1.418-1.274C48.239,32.195,50.89,28.211,53.556,24.237Zm66.151,65.006c-.907-.008-1.409.693-2.015,1.139-3.083,2.273-6.121,4.606-9.208,6.874a11.033,11.033,0,0,0-2.645,2.729c-2.42,3.565-4.873,7.107-7.3,10.665-.161.235-.457.5-.1.818C107.722,107.451,118.084,95.907,119.708,89.244Zm2.168-5.535c4.086-10.609,3.672-21.213.515-31.848-.867,4.161-1.51,8.333-2.1,12.511a15.27,15.27,0,0,0-.386,4.276c.368,2.687.681,5.382,1.031,8.072C121.236,79.051,121.56,81.379,121.875,83.708Zm-91.94-31.9-.606.051C26.754,62.456,26.708,73,30.091,83.492c.85-5.044,1.509-10.09,2.114-15.143a9.727,9.727,0,0,0-.106-2.383c-.269-2.056-.577-4.107-.893-6.157C30.794,57.141,30.36,54.477,29.936,51.811Zm23.6,59.434a6.913,6.913,0,0,0-1.486-2.83c-2.254-3.29-4.163-6.929-6.916-9.736-3.551-3.62-7.963-6.334-12.156-9.235-.035-.024-.133.044-.426.152A51,51,0,0,0,53.535,111.245ZM98.566,24.171c2.384,3.572,4.789,7.13,7.141,10.722a11.2,11.2,0,0,0,2.969,3.073c3.067,2.16,6.106,4.359,9.173,6.518.412.29.756.878,1.429.57C117.674,39.425,105.927,27.248,98.566,24.171Z"
        />
      </svg>
    </div>
  );
};
