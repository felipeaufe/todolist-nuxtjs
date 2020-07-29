export default (context, inject) => {

    /**
     * Generate a random number to be a new version value
     */
    const newVersion = () => Math.floor(Math.random() * 9000000000) + 1000000000;
    inject('newVersion', newVersion);
  }