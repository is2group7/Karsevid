import logging

# Logger BD
bdLogger = logging.getLogger('bdLogger')
bdLogger.setLevel(logging.DEBUG)

formatter1 = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
file_handler1 = logging.FileHandler('database_logging.log')
file_handler1.setFormatter(formatter1)

bdLogger.addHandler(file_handler1)

# Logger API

apiLogger = logging.getLogger('apiLogger')
apiLogger.setLevel(logging.DEBUG)

formatter2 = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
file_handler2 = logging.FileHandler('api_logging.log')
file_handler2.setFormatter(formatter2)

apiLogger.addHandler(file_handler2)