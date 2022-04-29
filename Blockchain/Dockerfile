############################################################
#
# Dockerfile to run a Blockchain Container
# 
############################################################

# docker build -t masters/addtochain:latest .
# docker run -p 5000:5000 masters/addtochain:latest


FROM python:3

LABEL key="swork002@odu.edu"

WORKDIR /usr/src/app

RUN pip install flask
RUN pip install python-decouple
RUN pip install web3
RUN pip install "web3[tester]"
RUN pip install py-solc-x

COPY ./* ./

EXPOSE 5000

CMD python EtheriumChain.py