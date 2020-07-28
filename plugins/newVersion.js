export default (context, inject) => {
    const newVersion = () => Math.floor(Math.random() * 9000000000) + 1000000000;
    inject('newVersion', newVersion);
  }